'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { Station } from '@/types/networks';
import { useMap } from '@/context/MapContext';

/**
 * StationsTable Component
 *
 * Tabla de estaciones con columnas ordenables.
 *
 * Modificación respecto a la versión anterior:
 *  - Cada fila es ahora interactiva: al hacer click dispara flyTo()
 *    via MapContext, animando la cámara del mapa hasta esa estación.
 *
 * Features:
 *  - Columnas ordenables: name, free_bikes, empty_slots
 *  - Ciclo de ordenación: asc → desc → sin orden
 *  - Click en fila → flyTo() en el mapa persistente
 *  - Estado vacío si no hay estaciones
 */

interface StationsTableProps {
  stations: Station[];
}

type SortField = 'name' | 'free_bikes' | 'empty_slots';
type SortDirection = 'asc' | 'desc' | null;

export function StationsTable({ stations }: StationsTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Consumimos flyTo del contexto del mapa
  const { flyTo } = useMap()

  // ─── Sorting ────────────────────────────────────────────────────────────────

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedStations = useMemo(() => {
    if (!sortField || !sortDirection) return stations;

    return [...stations].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      if (sortField === 'name') {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [stations, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3" />;
    if (sortDirection === 'asc') return <ArrowUp className="h-3 w-3" />;
    if (sortDirection === 'desc') return <ArrowDown className="h-3 w-3" />;
    return <ArrowUpDown className="h-3 w-3" />;
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="bg-torres-bay-800 text-base-white px-4 lg:px-10">
      <div className="pt-2 pb-3">
        <p className="text-sm">
          All <span className="inline-flex items-center justify-center min-w-2rem mx-2 px-2 rounded border border-grenadier-400 font-medium text-grenadier-400">{stations.length}</span> stations
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-base-white">
              <th className="text-left p-2">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-sm font-medium uppercase text-base-base-white"
                >
                  Station Name
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-center p-2">
                <button
                  onClick={() => handleSort('free_bikes')}
                  className="flex items-center gap-2 text-sm font-medium uppercase text-base-white"
                >
                  Free Bikes
                  {getSortIcon('free_bikes')}
                </button>
              </th>
              <th className="text-center p-2">
                <button
                  onClick={() => handleSort('empty_slots')}
                  className="flex items-center gap-2 text-sm font-medium uppercase text-base-white"
                >
                  Empty Slots
                  {getSortIcon('empty_slots')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStations.map((station, index) => (
              <tr
                key={station.id || index}
                onClick={() => flyTo(station)}
                className="border-b border-dashed border-base-white/50 hover:bg-base-white/10 transition-colors cursor-pointer"
              > {/** Todo: add different background color for selected station with useState */}
                <td className="px-2 py-4 text-base hover:translate-x-2 transition transition-duration-300">
                  {station.name}
                </td>
                <td className="px-2 py-4 text-base text-center font-bold">
                  {station.free_bikes}
                </td>
                <td className="px-2 py-4 text-base text-center font-bold">
                  {station.empty_slots}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}