export const SearchConfig = {
    MinSearchChars: 3,
    FieldsSearchOrder: [
        { Name: "name", Order: 0 },
        { Name: "nativeName", Order: 1 },
        { Name: "region", Order: 5 },
        { Name: "subregion", Order: 6 },
        { Name: "alpha3Code", Order: 2 },
        { Name: "capital", Order: 3 },
        { Name: "languages", Order: 4, InnerName: "name" },
        { Name: "timezones", Order: 7 }
    ]
};
