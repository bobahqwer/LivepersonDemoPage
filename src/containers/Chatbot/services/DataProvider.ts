import { CountryInfo } from "../models/Country";
import { GlobalConfig } from "../../../config/global.config";

export default class DataProvider {
  static GetAllCountries = (): Promise<Array<CountryInfo>> => {
    return new Promise<Array<CountryInfo>>((resolve, reject) => {
      const _bulkData = localStorage.getItem(
        GlobalConfig.Keys.Chatbot.CountriesBulkData
      );
      if (_bulkData) return resolve(JSON.parse(_bulkData));

      fetch(GlobalConfig.ApiEndpoints.Chatbot.BulkData)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem(GlobalConfig.Keys.Chatbot.CountriesBulkData, JSON.stringify(data)); // save to browser storage
          resolve(data);
        })
        .catch((error) => console.error(error));
    });
  };
}
