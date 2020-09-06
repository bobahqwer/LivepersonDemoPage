import React from "react";
import { CountryInfo } from "../models/Country";

interface CountryBoxProps {
  country: CountryInfo;
}
interface CountryBoxState { }

export default class CountryBox extends React.Component<CountryBoxProps, CountryBoxState> {

  constructor(props: CountryBoxProps) {
    super(props);

    this.initCoponent();
  }

  private initCoponent() { }

  render() {
    return <>
      {this.props.country ? (
        <div className="country-box">
          <div className="title">{this.props.country.name}</div>
          <div>Native name: {this.props.country.nativeName}</div>
          <div>Alpha 3 code: {this.props.country.alpha3Code}</div>
          <div>Capital: {this.props.country.capital}</div>
          <div className="flag">Flag: <img src={this.props.country.flag} alt={this.props.country.name} /></div>
          <div>Languages:{" "}{this.props.country.languages.map((item) => item.name).join(", ")}</div>
          <div>{this.getEllipsisField("Borders", this.props.country.borders.join(", "), this.props.country.borders.length, 6)}</div>
          <div>{this.getEllipsisField("Borders Names", this.props.country.bordersNames, this.props.country.borders.length, 3)}</div>
          <div>Region: {this.props.country.region}</div>
          <div>Subregion: {this.props.country.subregion}</div>
          <div>{this.getEllipsisField("Time zones", this.props.country.timezones.join(", "), this.props.country.timezones.length, 3)}</div>
        </div>
      ) : ""}
    </>;
  }

  componentDidMount() { }
  componentDidUpdate() { }

  private getEllipsisField = (title, data, length, maxLength) => {
    return <>
      <div className="ellipsis">{title}: {data ? data : "None"}</div>
      {length > maxLength ? <span className="tooltiptext tooltip-top">{data}</span> : ""}
    </>;
  };
}
