import React from "react";
import { CountryInfo } from "../models/Country";
import DataProvider from "../services/DataProvider";
import CountryBox from "./CountryBox";
import { SearchConfig } from "../../../config/search.config";
import { FieldsSearchOrder } from "../models/Search";

interface SearchFormProps { }
interface SearchFormState {
  allCountries: Array<CountryInfo>;
  shownCountries: Array<CountryInfo>;
  isSearchCheckboxVisible: boolean;
}

export default class SearchForm extends React.Component<
  SearchFormProps,
  SearchFormState
  > {
  //#region Variables

  allCountries: Array<CountryInfo>;
  searchOrder: Array<FieldsSearchOrder>;
  state = {
    shownCountries: new Array<CountryInfo>(),
    isSearchCheckboxVisible: false
  } as SearchFormState;

  //#endregion

  //#region Component Events

  constructor(props: SearchFormProps) {
    super(props);

    this.initCoponent();
  }

  private initCoponent() {
    this.searchOrder = SearchConfig.FieldsSearchOrder;

    // get a bulk data from external API service
    DataProvider.GetAllCountries().then((data) => {
      this.allCountries = data;
      this.setState({ shownCountries: data });
    });
  }

  render() {
    return (
      <div>
        <div className="countries-form">
          <span className="text"><input placeholder="Search..." type="text" onChange={this.onChangeSearchInput} onFocus={this.onFocusSearchInput} /></span>
          <label className={this.state.isSearchCheckboxVisible ? "checkbox visible" : "checkbox"}><input type="checkbox" title="Search by countries with land borders" value="true" /> Search by countries with land borders</label>
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

  componentDidMount() { }
  componentDidUpdate() { }

  //#endregion

  //#region Private methods

  //#endregion

  //#region Events methods

  private onChangeSearchInput = (event) => {
    const _text = event.target.value as string;
    const _dataToShow = this.allCountries.filter((item) => {
      return item.name.toLowerCase().indexOf(_text.toLowerCase()) >= 0;
    });
    this.setState({ shownCountries: _dataToShow });
  };

  private onFocusSearchInput = (event) => {
    this.setState({ isSearchCheckboxVisible: true });
  }

  //#endregion
}
