namespace sclabs.alumniportal.events;

using {
    managed,
    sap
} from '@sap/cds/common';

entity events : managed {
    key ID      : UUID @odata.Type : 'Edm.String';
        title   : String;
        content : String;
        photo   : LargeString;
        date    : String;
}
