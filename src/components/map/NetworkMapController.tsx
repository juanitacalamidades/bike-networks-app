'use client'

/**
 * NetworkMapController — puente entre la página servidor y el mapa.
 *
 * Por qué existe este componente:
 *  - NetworkDetailPage es un Server Component y no puede usar hooks.
 *  - Este componente cliente recibe las estaciones con fetch por
 *    la página y se encarga de comunicárselas al mapa via context.
 *
 * Responsabilidades:
 *  - Al montar: llama a setMarkers() con las estaciones de la red
 *    y flyTo() al centro geográfico de la red.
 *  - Al desmontar: llama a clearMarkers() para limpiar las estaciones
 *    del mapa y dejar paso a los markers de redes.
 *
 * No renderiza nada visible — es un componente de efectos puro.
 */

import { useEffect } from 'react'
import { useMap } from '@/context/MapContext'
import { Station, Location } from '@/types/networks'

interface NetworkMapControllerProps {
  stations: Station[]
  location: Location
}

export default function NetworkMapController({ stations, location }: NetworkMapControllerProps) {
  const { flyTo, setMarkers, clearMarkers } = useMap()

  useEffect(() => {
    // Pintamos las estaciones de esta red en el mapa
    setMarkers(stations)

    // Centramos la cámara en la zona de la red
    // Usamos la primera estación con coordenadas válidas como centro
    const center = stations.find(
      (s) => s.latitude && s.longitude
    )

    if (center) flyTo(center)

    // Al salir de la vista, limpiamos los markers de estaciones
    return () => clearMarkers()
  }, [stations])

  return null
}