'use client'

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import type { Network } from '@/types/networks'

// Set Mapbox access token (outside component)
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface NetworksMapViewProps {
    networks : Network[];
}

export function NetworksMapView({ networks }: NetworksMapViewProps) {
    
    // Ref to the map container div
    const mapContainer = useRef<HTMLDivElement>(null);
    // Ref to the map instance
    const map = useRef<mapboxgl.Map | null>(null);
    const markers = useRef<mapboxgl.Marker[]>([]);

    const router = useRouter();

    useEffect(() => {
        //Don't initialize if the map exists
        if(map.current) return;
        if(!mapContainer.current) return;

        //Initialize map
        map.current = new mapboxgl.Map({
            container : mapContainer.current,
            style : 'mapbox://styles/mapbox/streets-v12',
            center : [-0, 20], // [long, lat]-Madrid
            zoom : 5 // Zoom level (0 = world, 22 = building)
        })

        // Add navigation controls (zoom buttons)
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        //Cleanup to avoid memory leak
        return () => {
            // Remove all markers
            markers.current.forEach(marker => marker.remove());
            markers.current = [];
            map.current?.remove();
        }

    }, []); 



    // Add markers when network changes
    // useEffect(() => {
    //     if(!map.current) return;

    //     //Remove existing markers
    //     markers.current.forEach(marker => marker.remove());
    //     markers.current = [];

    //     //If no networks, nothing to show
    //     if(networks.length === 0) return;

    //     //Create bounds to fit all markers
    //     const bounds = new mapboxgl.LngLatBounds();


    //     //Add marker for each network
    //     networks.forEach( network => {
    //         if(!map.current) return;

    //         const { longitude, latitude } = network.location;

    //         //Custom marker element
    //         const element = document.createElement('div');
    //         element.className = 'network-marker';
    //         element.style.width = '16px';
    //         element.style.height = '16px';
    //         element.style.borderRadius = '50%';
    //         element.style.backgroundColor = '#f7a97a'; // grenadier-300
    //         element.style.border = '3px solid #f37b4499'; // grenadier-400
    //         element.style.cursor = 'pointer';
    //         element.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

    //         //Hover
    //         element.addEventListener("mousenter", () => {
    //             element.style.transform = 'scale(1.2)';
    //             element.style.transition = 'transform 0.2s'
    //         })
    //         element.addEventListener("mauseleave", () => {
    //             element.style.transform = 'scale(1)';
    //         })

    //         //Create the marker
    //         const marker = new mapboxgl.Marker(element).setLngLat([ longitude, latitude ]).setPopup(
    //             new mapboxgl.Popup({ offset : 25 }).setHTML(`
    //                      <div style="padding: 8px;">
    //                         <h3 style="font-weight: bold; margin-bottom: 4px;">${network.name}</h3>
    //                         <p style="font-size: 12px; color: #666;">${network.location.city}, ${network.location.country}</p>
    //                     </div>
    //                 `)
    //         ).addTo(map.current)

    //         //Add to markers array for cleanup
    //         markers.current.push(marker);

    //         //Extend bound to include this marker
    //         bounds.extend([longitude,latitude]);
    //     });

    //     // // Fit map to show all markers
    //     // map.current.fitBounds(bounds, {
    //     //     padding: 50, // 50px padding around edges
    //     //     maxZoom: 12 // Don't zoom in too much if only one network
    //     // });



    // }, [networks, router])

    console.log(networks)

    return (
        <div ref={mapContainer} className="w-full h-full"></div>
    )

}