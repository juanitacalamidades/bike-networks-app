import { Network, NetworksAPIResponse } from "@/types/networks";


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

export async function getNetworkById(id : string) : Promise<Network> {

    try{

        const response = await fetch(`${API_URL}/networks/${id}`, {

            // no cache because station data changes all the time
            cache : 'no-store'
        });

        if(!response.ok){
            throw new Error(`HTTP error. Status: ${response.status}`);
        };

        const data = await response.json();

    }catch(error){
        
        console.error(`Error fetching network ${id}: `, error);
        throw new Error(`Failed to fetch details for ${id} networks`);
    }
}