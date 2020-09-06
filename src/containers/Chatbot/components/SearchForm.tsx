import React from "react";
import { CountryInfo } from "../models/Country";
import DataProvider from "../services/DataProvider";
import CountryBox from "./CountryBox";
import { SearchConfig } from "../../../config/search.config";
import { FieldsSearchOrder } from "../models/Search";
import { Helpers } from "../../../services/Helpers";
import { LabelsConfig } from "../../../config/labels.config";
import LPChatService from "../services/LPChatService";

interface SearchFormProps { }
interface SearchFormState {
  allCountries: Array<CountryInfo>;
  shownCountries: Array<CountryInfo>;
  isSearchCheckboxVisible: boolean;
  isResultsFoundVisible: boolean;
}

export default class SearchForm extends React.Component<SearchFormProps, SearchFormState> {

  //#region Variables

  allCountries: Array<CountryInfo>;
  searchOrder: Array<FieldsSearchOrder>;
  prevUserInput: string;
  isBorderCheckbox: boolean;
  state = {
    shownCountries: new Array<CountryInfo>(),
    isSearchCheckboxVisible: false,
    isResultsFoundVisible: false
  } as SearchFormState;

  //#endregion

  //#region Component Events

  constructor(props: SearchFormProps) {
    super(props);

    this.initCoponent();
  }

  private initCoponent() {
    // get ordered search fields from configuration
    this.searchOrder = SearchConfig.FieldsSearchOrder.sort(Helpers.SortArrayByProperty("Order"));
    this.prevUserInput = "";
    this.isBorderCheckbox = false;

    // get a bulk data from external API service
    DataProvider.GetAllCountries().then((data) => {
      data = this.prepareData(data);
      this.allCountries = data;

      this.setState({ shownCountries: data });
    });
  }

  render() {
    return (
      <div>
        <div className="countries-form">
          <span className="text"><input placeholder="Search..." type="text" onChange={this.onChangeSearchInput} onFocus={this.onFocusSearchInput} /></span>
          <label className={this.state.isSearchCheckboxVisible ? "checkbox visible" : "checkbox"}><input type="checkbox" title={LabelsConfig.SearchCheckbox.value} onChange={this.onChangeBorderCheckbox} /> {LabelsConfig.SearchCheckbox.value}</label>
          {this.state.isResultsFoundVisible ? <i className="results-found">Results found: {this.state.shownCountries.length}</i> : ""}
        </div>
        <ul className="countries-list columns">
          {this.state.shownCountries
            ? this.state.shownCountries.map((item, index) => (
              <li key={"countryBox_" + index} className="column column-inline">
                <CountryBox country={item} />
              </li>
            ))
            : ""}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    //setTimeout(LPChatService.InitChat,3000);
  }
  //componentDidUpdate() { }

  //#endregion

  //#region Private methods

  private prepareData = (data: CountryInfo[]) => {
    return data.map(item => {
      item.borders && item.borders.forEach(border => {
        const _index = data.findIndex(o => o.alpha3Code === border);
        item.bordersNames = item.bordersNames ? item.bordersNames + ", " + data[_index].name : data[_index].name;
      });

      return item;
    });
  };

  // filter data pool using user input text, text appearance (start/middle) and configured order of fields (by relevance)
  private filterBySearchFields = (text: string, isCheckStart?: boolean): CountryInfo[] => {
    const _text = text.toLowerCase();
    const _searchPoolData = this.getSearchPoolData(_text);
    const _resultsArr = this.searchOrder.map(configItem => { // get results array for each configured field
      return _searchPoolData.filter((item) => {
        const _searchValue = item[configItem.Name];

        if (!_searchValue)                      // case of null
          return false;
        if (typeof _searchValue === "string")   // case of string
          return this.filterStringValue(_text, _searchValue, isCheckStart);
        if (Array.isArray(_searchValue))        // case of array
          return this.filterArrayValue(_text, _searchValue, configItem.InnerName, isCheckStart);
      });
    });

    return Helpers.ConcatMultiArraysDistinct(_resultsArr);
  };

  // filter string value using 'start with' and 'not start with' ('index of') approaches
  private filterStringValue = (text: string, searchValue: string, isCheckStart?: boolean) => {
    if (isCheckStart)
      return searchValue.toLowerCase().startsWith(text);

    return searchValue.toLowerCase().indexOf(text) > 0;
  };

  // filter array value using 'start with' and 'not start with' ('index of') approaches
  private filterArrayValue = (text: string, searchValue: any, innerName: string, isCheckStart?: boolean) => {
    if (isCheckStart) {
      if (innerName)
        return searchValue.findIndex(o => o[innerName] ? o[innerName].toLowerCase().startsWith(text) : false) >= 0
      else
        return searchValue.findIndex(o => o ? o.toLowerCase().startsWith(text) : false) >= 0;
    }

    if (innerName)
      return searchValue.findIndex(o => o[innerName] ? o[innerName].toLowerCase().indexOf(text) > 0 : false) >= 0
    else
      return searchValue.findIndex(o => o ? o.toLowerCase().indexOf(text) > 0 : false) >= 0;
  };

  // optimization of search responce: prepare optimize search data pool
  private getSearchPoolData = (text: string): CountryInfo[] => {
    if (text.startsWith(this.prevUserInput) && this.prevUserInput.length + 1 === text.length) // user added a single character --> the shown results will be the recent data pool for search (quick responce)
      return this.state.shownCountries;
    return this.allCountries;
  };

  // Regular search (not by borders)
  private executeRegularSearch = (text: string): CountryInfo[] => {
    const _dataStartWith = this.filterBySearchFields(text, true);            // get all 'start with' results
    const _dataMiddle = this.filterBySearchFields(text);                     // get all 'index of' results
    return Helpers.ConcatMultiArraysDistinct([_dataStartWith, _dataMiddle]);
  };

  // Borders search (not by borders)
  private executeBorderSearch = (text: string): CountryInfo[] => {
    const _text = text.toLowerCase();

    return this.allCountries.filter((item) => {
      const _searchValue = item.bordersNames;

      if (!_searchValue)    // case of null
        return false;

      return this.filterStringValue(_text, _searchValue, true) || this.filterStringValue(_text, _searchValue, false);
    });
  };

  //#endregion

  //#region Events methods

  private onChangeSearchInput = (event) => {
    const _text = event ? event.target.value as string : this.prevUserInput;

    // in case user input less then N characters --> skip search
    if (_text.length < SearchConfig.MinSearchChars) {
      this.setState({ shownCountries: [...this.allCountries], isResultsFoundVisible: false });
      return;
    }

    // execute search
    const _dataToShow = this.isBorderCheckbox ? this.executeBorderSearch(_text) : this.executeRegularSearch(_text);

    this.prevUserInput = _text.toLowerCase();
    this.setState({ shownCountries: _dataToShow, isResultsFoundVisible: _dataToShow.length > 0 });
  };

  private onFocusSearchInput = (event) => {
    this.setState({ isSearchCheckboxVisible: true });
  };

  private onChangeBorderCheckbox = (event) => {
    this.isBorderCheckbox = event.target.checked;
    this.onChangeSearchInput(null);
  };

  //#endregion
}
