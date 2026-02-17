'use client'

import { createContext, useContext, useRef, RefObject } from 'react'
import mapboxgl from 'mapbox-gl'
import { Station } from '@/types/networks'
import { createMarkerElement, MARKER_COLORS } from '@/lib/utils/mapMarkers'




/**
 * MapContext — contexto global para el mapa Mapbox persistente.
 *
 * Responsabilidades:
 *  - Mantener la referencia (mapRef) a la instancia de mapboxgl.Map.
 *    MapboxMap.tsx la inicializa; el resto de componentes la consumen.
 *  - Exponer flyTo() para animar la cámara a una estación concreta.
 *  - Exponer setMarkers() para pintar markers de estaciones al entrar
 *    en la vista de detalle de red.
 *  - Exponer clearMarkers() para eliminar los markers de estaciones
 *    al salir de la vista de detalle, dejando paso a los markers de redes.
 *
 * Por qué markersRef y no useState:
 *  - Los markers son efectos del DOM, no estado de React.
 *  - Guardarlos en useState provocaría re-renders innecesarios.
 *  - Con useRef los gestionamos como efectos secundarios sin notificar a React.
 *
 * Uso:
 *  1. Envuelve el árbol en <MapProvider> dentro de app/layout.tsx
 *  2. En cualquier componente hijo: const { flyTo, setMarkers, clearMarkers } = useMap()
 */



// ─── Tipos ────────────────────────────────────────────────────────────────────

type MapContextType = {
  /** Referencia directa a la instancia de mapboxgl.Map.
   *  Solo MapboxMap.tsx escribe en ella; el resto solo lee. */
  mapRef: RefObject<mapboxgl.Map | null>

  /** Anima la cámara del mapa hasta la estación indicada. */
  flyTo: (station: Station) => void

  /** Recibe un array de estaciones y pinta un marker por cada una.
   *  Limpia los markers anteriores antes de pintar los nuevos. */
  setMarkers: (stations: Station[]) => void

  /** Elimina todos los markers activos.
   *  Se llama al salir de la vista de detalle de red. */
  clearMarkers: () => void
}

// ─── Contexto ─────────────────────────────────────────────────────────────────

const MapContext = createContext<MapContextType | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function MapProvider({ children }: { children: React.ReactNode }) {
  const mapRef = useRef<mapboxgl.Map | null>(null)

  /** Instancias de markers activos en el mapa.
   *  Guardamos las referencias para poder llamar .remove() al limpiar. */
  const markersRef = useRef<mapboxgl.Marker[]>([])

  // ─── flyTo ────────────────────────────────────────────────────────────────

  const flyTo = (station: Station) => {
    if (!mapRef.current) return

    mapRef.current.flyTo({
      center: [station.longitude, station.latitude],
      zoom: 15,
      duration: 1800,
      essential: true,
    })
  }

  // ─── clearMarkers ─────────────────────────────────────────────────────────

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []
  }

  // ─── setMarkers ───────────────────────────────────────────────────────────

  const setMarkers = (stations: Station[]) => {
    if (!mapRef.current) return

    // Limpiamos markers anteriores antes de pintar los nuevos
    clearMarkers()

    markersRef.current = stations.map((station) =>
      new mapboxgl.Marker({ element: createMarkerElement(MARKER_COLORS.station) })
        .setLngLat([station.longitude, station.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <strong>${station.name}</strong>
            <p>Free bikes: ${station.free_bikes}</p>
            <p>Free slots: ${station.empty_slots}</p>
          `)
        )
        .addTo(mapRef.current!)
    )
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <MapContext.Provider value={{ mapRef, flyTo, setMarkers, clearMarkers }}>
      {children}
    </MapContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useMap — hook para consumir el MapContext.
 * Lanza un error descriptivo si se usa fuera de <MapProvider>.
 */
export function useMap() {
  const ctx = useContext(MapContext)
  if (!ctx) throw new Error('useMap debe usarse dentro de <MapProvider>')
  return ctx
}