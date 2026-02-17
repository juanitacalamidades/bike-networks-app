'use client'

/**
 * MapboxMap — componente del mapa Mapbox persistente.
 *
 * Responsabilidades:
 *  - Inicializar la instancia de mapboxgl.Map y asignarla a mapRef
 *    del contexto para que otros componentes puedan consumirla.
 *  - Fetchear todas las redes al montar y pintar un marker por red.
 *  - Al hacer click en un marker, mostrar un popup con el nombre de la red.
 *
 * Cambio respecto a la versión anterior:
 *  - Antes fetchaba todas las estaciones de todas las redes (una petición
 *    por red), lo que saturaba el rate limit de la API con un 429.
 *  - Ahora solo fetcha getNetworks() — una única petición — y pinta
 *    un marker por red. Las estaciones se cargan en /network/[id].
 *
 * Notas:
 *  - El useEffect con el mapa solo se ejecuta una vez (array vacío).
 *  - El cleanup llama a map.remove() para liberar recursos WebGL.
 */

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useMap } from '@/context/MapContext'
import { Network } from '@/types/networks'
import { createMarkerElement, MARKER_COLORS } from '@/lib/utils/mapMarkers'

// ─── Token ────────────────────────────────────────────────────────────────────

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
if (!token) throw new Error('NEXT_PUBLIC_MAPBOX_TOKEN no está definido en .env')
mapboxgl.accessToken = token

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Fetcha la lista de redes desde la API de CityBikes.
 * Una única petición — sin riesgo de rate limit.
 */
async function fetchNetworks(): Promise<Network[]> {
  const response = await fetch('/api/networks')
  if (!response.ok) throw new Error('Error cargando redes')
  return response.json()
}

/**
 * Pinta un marker circular por red en el mapa.
 * El popup muestra el nombre de la red y la ciudad.
 */
function paintNetworkMarkers(map: mapboxgl.Map, networks: Network[]): mapboxgl.Marker[] {
  return networks.map((network) =>
    new mapboxgl.Marker({ element: createMarkerElement(MARKER_COLORS.network) })
      .setLngLat([network.location.longitude, network.location.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <strong>${network.name}</strong>
          <p>${network.location.city}, ${network.location.country}</p>
        `)
      )
      .addTo(map)
  )
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function MapboxMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { mapRef } = useMap()

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [9, 44], //Europe
      zoom: 4, //continent
      projection: 'mercator' //flat map
    })

    mapRef.current = map

    map.addControl(new mapboxgl.NavigationControl({ showCompass : false }), 'top-right')
    map.addControl(new mapboxgl.GeolocateControl({ 
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
       // showUserHeading: true //flecha de dirección
      }), 'top-left')

    map.on('load', async () => {
      try {
        const networks = await fetchNetworks()
        paintNetworkMarkers(map, networks)
      } catch (error) {
        console.error('Error cargando redes en el mapa:', error)
      }
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}