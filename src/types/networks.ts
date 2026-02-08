

// Represents geographical location for a network
export interface Location {
    city : string;
    country : string;
    latitude : number;
    longitude : number;
}


// Represents a complete network
export interface Network {
    id : string;
    name : string;
    href : string; // API url for detail
    location : Location;
    company : string[] | string | null;
}


// CityBike API response for endpoint /networks
export interface NetworksAPIResponse {
    networks : Network[]; // All networks available
}
