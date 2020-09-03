import { GlobalConfig } from "./global.config";

class LabelString {
    private _value: any;
    get value(): string {
        return this._value[GlobalConfig.Environment.Lang] ? this._value[GlobalConfig.Environment.Lang] : this._value[GlobalConfig.Environment.DefaultLang];
    }

    constructor(data: any) {
        this._value = data;
    }
}

export class LabelsConfig {

    static SearchCountryInfo = new LabelString({
        En: "Search country information",
        Fr: "Rechercher des informations sur le pays",
        //It: "Cerca informazioni sul paese",
    });
    static SearchCheckbox = new LabelString({
        En: "Search by countries that have land borders with the searched country",
        Fr: "Recherche par pays ayant des frontières terrestres avec le pays recherché",
        It: "Cerca per paesi che hanno confini terrestri con il paese cercato"
    });
};

