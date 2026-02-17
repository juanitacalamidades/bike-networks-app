import { getNetworks } from '@/lib/api/citybikes'
import { NextResponse } from 'next/server'

/**
 * GET /api/networks
 *
 * API Route interna que devuelve la lista de todas las redes.
 *
 * Por qué existe esta ruta:
 *  - MapboxMap.tsx es un componente cliente ('use client') y no puede
 *    usar getNetworks() directamente conservando la caché del servidor.
 *  - Esta route corre en el servidor, aplica el revalidate de 3600s
 *    definido en getNetworks(), y expone el resultado como JSON.
 *
 * Caché:
 *  - getNetworks() revalida cada hora — las redes raramente cambian.
 *  - Esta route hereda esa caché automáticamente.
 */

export async function GET() {
  try {
    const networks = await getNetworks()
    return NextResponse.json(networks)
  } catch (error) {
    console.error('Error en GET /api/networks:', error)
    return NextResponse.json(
      { error: 'Error cargando redes' },
      { status: 500 }
    )
  }
}