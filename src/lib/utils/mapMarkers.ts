/**
 * mapMarkers.ts — utilidades para markers personalizados en Mapbox.
 *
 * Centraliza la creación de markers para evitar duplicar código
 * entre MapboxMap.tsx (markers de redes) y MapContext.tsx (markers
 * de estaciones).
 *
 * Uso:
 *  import { createMarkerElement } from '@/lib/utils/mapMarkers'
 *  new mapboxgl.Marker({ element: createMarkerElement('#3B82F6') })
 */

/**
 * Crea un elemento HTML circular para usar como marker personalizado.
 * Reemplaza el pin por defecto de Mapbox por un círculo con borde.
 *
 * @param color - Color de relleno en formato hex (ej. '#3B82F6')
 * @param size  - Diámetro en píxeles (por defecto 12)
 */
export function createMarkerElement(color: string, size: number = 12): HTMLDivElement {
  const el = document.createElement('div')
  el.style.width = '14px'
  el.style.height = '14px'
  el.style.borderRadius = '50%'
  el.style.backgroundColor = color
  el.style.border = '2px solid white'
  el.style.boxShadow = '0 0 4px rgba(0,0,0,0.4)'
  el.style.cursor = 'pointer'
  return el
}

/**
 * Colores semánticos para los distintos tipos de marker en la app.
 * Centralizar los colores aquí facilita cambiarlos globalmente.
 */
export const MARKER_COLORS = {
  network: '#3B82F6',   // azul — markers de redes en vista /
  station: '#F97316',   // naranja — markers de estaciones en vista /network/[id]
} as const