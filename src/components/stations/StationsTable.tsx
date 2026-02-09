'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { Station } from '@/types/networks';

interface StationsTableProps {
  stations: Station[];
}

type SortField = 'name' | 'free_bikes' | 'empty_slots';
type SortDirection = 'asc' | 'desc' | null;

export function StationsTable({ stations }: StationsTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
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

  // Sort stations
  const sortedStations = useMemo(() => {
    if (!sortField || !sortDirection) {
      return stations;
    }

    return [...stations].sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;

      if (sortField === 'name') {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      } else {
        aVal = a[sortField];
        bVal = b[sortField];
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [stations, sortField, sortDirection]);

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="h-4 w-4" />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown className="h-4 w-4" />;
    }
    return <ArrowUpDown className="h-4 w-4" />;
  };

  return (
    <div className="bg-torres-bay-800 text-white px-10">
      {/* Header con contador */}
      <div className="px-6 py-4 border-b border-white/10">
        <p className="text-sm">
          All <span className="inline-flex items-center justify-center min-w-2rem px-2 py-0.5 rounded-full bg-white/20 font-medium">{stations.length}</span> stations
        </p>
      </div>

      {/* Tabla de estaciones */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors"
                >
                  Station Name
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('free_bikes')}
                  className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors"
                >
                  Free Bikes
                  {getSortIcon('free_bikes')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('empty_slots')}
                  className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors"
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
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium">
                  {station.name}
                </td>
                <td className="px-6 py-4 text-lg font-bold">
                  {station.free_bikes}
                </td>
                <td className="px-6 py-4 text-lg font-bold">
                  {station.empty_slots}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mensaje si no hay estaciones */}
      {stations.length === 0 && (
        <div className="px-6 py-12 text-center text-white/60">
          <p>No stations found for this network</p>
        </div>
      )}
    </div>
  );
}
