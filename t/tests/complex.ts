interface Location {
    id       : string;
    name     : string;
    location : {
        address : {
            address1    : string;
            city        : string;
            country     : string;
            postal_code : string;
            address2?   : string;
            address3?   : string;
            address4?   : string;
            address5?   : string;
            state?      : string;
        };
        coordinates : {
            lon : number;
            lat : number;
        };
    };
    contact : {
        phone   : string;
        fax     : string;
        support : string;
        web     : string;
        email   : string;
    };
    i18n : {
        default_currency     : string;
        default_locale       : string;
        available_currencies : string[];
        available_locales    : string[];
    };
}