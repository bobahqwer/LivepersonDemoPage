export class CountryInfo {
  name: string;
  nativeName: string;
  alpha3Code: string;

  capital: string;
  flag: string;
  languages: CountryLanguage[];
  borders: string[];
  region: string;
  subregion: string;
  timezones: string[];
}

export class CountryLanguage {
  name: string;
  nativeName: string;
}
