namespace sclabs.alumniportal.news;

using {
    managed,
    sap
} from '@sap/cds/common';

entity news : managed {
    key ID      : UUID @odata.Type : 'Edm.String';
        title   : String;
        content : String;
        photo   : LargeString;
        date    : String;
}
