

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

// ============================================
// NEW TYPES FOR DETAIL VIEW
// ============================================

/**
 * Station within a network
 */
export interface Station {
    id: string;
    name: string;
    timestamp: string;
    latitude: number;
    longitude: number;
    free_bikes: number;
    empty_slots: number;
    extra?: {
        uid?: string;
        number?: number;
        [key: string]: any;
    };
}

/**
 * Full network details from the network detail endpoint
 * Extends Network with stations array
 */
export interface NetworkDetail extends Omit<Network, 'href'> {
    stations: Station[];
}

/**
 * API Response for single network detail
 */
export interface NetworkDetailAPIResponse {
    network: NetworkDetail;
}