import { Network, NetworkDetail, NetworksAPIResponse, NetworkDetailAPIResponse } from "@/types/networks";


// Basic URL from env. variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.citybik.es/v2';

/**
 * Gets list of networks from CityBikes API
 * 
 * @returns Promise networks in array
 * @throws Error if fails
 * 
 * Cache handling: data is revalidated every hour (3600s.)
 * as new networks are rarely added
 */


export async function getNetworks() : Promise<Network[]> {

    try{

        const response = await fetch(`${API_URL}/networks`, {

            next : { revalidate : 3600 } // every hour, to reduce server loading
        });

        if(!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }

        // JSON parse and type addition
        const data : NetworksAPIResponse = await response.json(); // type assertion

        return data.networks;

    }catch(error){

        // Log error for debugging
        console.error('Error fetching networks: ', error);

        // Error for component management
        throw new Error('Failed to fetch bicycle networks');
    }
}



/**
 * Gets details of a specific network by using ID
 * 
 * @param id - ID of the network
 * @returns Promise returns details from specific network
 */

export async function getNetworkById(id : string) : Promise<NetworkDetail> {

    try{

        const response = await fetch(`${API_URL}/networks/${id}`, {

            // Cache for 1 minute - station data changes frequently
            next: { revalidate: 60 }
        });

        if(!response.ok){
            throw new Error(`HTTP error. Status: ${response.status}`);
        };

       const data: NetworkDetailAPIResponse = await response.json();

       return data.network;

    }catch(error){
        
        console.error(`Error fetching network ${id}: `, error);
        throw new Error(`Failed to fetch details for ${id} networks`);
    }
}

/**
 * Helper function to normalize company data
 * The API returns company as string, string[], or null
 */
export function normalizeCompanies(company: string | string[] | null | undefined): string[] {
    if (!company) return [];
    return Array.isArray(company) ? company : [company];
}