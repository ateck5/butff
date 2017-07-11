export class globals {
    //TODO: change url to live url
    static url: string = "http://localhost:8000/api/";
}
export class user {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    phoneCountry?: string;
    nickname?: string;
    country?: string;
    city?: string;
    street?: string;
    streetNumber?: string;
    postcode?: string;
    discount?: string;
    discountDescription?: string;
}