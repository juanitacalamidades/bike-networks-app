'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { Station } from '@/types/networks';




/**
 * StationsTable Component
 * 
 * A client-side table component that displays bicycle stations with sortable columns.
 * 
 * Features:
 * - Displays station name, free bikes count, and empty slots count
 * - Sortable columns (name, free_bikes, empty_slots)
 * - Three-state sorting: ascending -> descending -> unsorted
 * - Visual feedback with sort direction icons
 * - Hover effects and smooth transitions
 * - Responsive table with horizontal scroll on small screens
 * - Empty state message when no stations exist
 * 
 * @module components/stations/StationsTable
 */


// Props for component - array of station objects to display
interface StationsTableProps {
  stations: Station[];
}


//Type definition for sortable field -> limits sorting to these three only: 
type SortField = 'name' | 'free_bikes' | 'empty_slots';

//Type dfinition for sort direction. Null = original order.
type SortDirection = 'asc' | 'desc' | null;


/**
 * StationsTable Component
 * 
 * Renders a sortable table of bicycle stations with real-time availability data.
 * Uses client-side state for sorting to provide instant feedback without server requests.
 * 
 * @param {StationsTableProps} props - Component props
 * @returns {JSX.Element} Rendered stations table
 */


export function StationsTable({ stations }: StationsTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null); // tracks which col is being sorted; null=original order
  const [sortDirection, setSortDirection] = useState<SortDirection>(null); // tracks direction of current sort; null=no sorting

  // ============================================================================
  // SORTING LOGIC
  // ============================================================================
  
  /**
   * Handles click events on sortable column headers
   * 
   * Implements a three-state sorting cycle:
   * 1. First click: Sort ascending
   * 2. Second click (same column): Sort descending
   * 3. Third click (same column): Remove sorting (back to original)
   * 
   * If clicking a different column, always start with ascending
   * 
   * @param {SortField} field - The field name to sort by
   */

  const handleSort = (field: SortField) => {
      // Check if clicking the same column that's already sorted
      if (sortField === field) {
        // Cycle through: asc -> desc -> null (remove sort)
        if (sortDirection === 'asc') {
          setSortDirection('desc');
        } else if (sortDirection === 'desc') {
          // Reset both to null to show original order
          setSortDirection(null);
          setSortField(null);
        }
      } else {
        // Clicking a different column - start fresh with ascending
        setSortField(field);
        setSortDirection('asc');
      }
    };


  /**
   * Memoized sorted stations array
   * 
   * Only recalculates when stations, sortField, or sortDirection change.
   * This prevents unnecessary re-sorting on every render, improving performance.
   * 
   * Returns:
   * - Original array if no sorting is active
   * - Sorted copy of the array if sorting is active
   */

  const sortedStations = useMemo(() => {
    // if no sorting is active, returns original array
    if (!sortField || !sortDirection) {
      return stations;
    }

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

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="h-3 w-3" />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown className="h-3 w-3" />;
    }
    return <ArrowUpDown className="h-3 w-3" />;
  };

  return (
    <div className="bg-torres-bay-800 text-base-white px-10">
      {/* Header con contador */}
      <div className="pt-2 pb-3">
        <p className="text-sm">
          All <span className="inline-flex items-center justify-center min-w-2rem mx-2 px-2 rounded border border-grenadier-400 font-medium text-grenadier-400">{stations.length}</span> stations
        </p>
      </div>

      {/* Tabla de estaciones */}
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
                className="border-b border-dashed border-base-white/50 hover:bg-base-white/10 transition-colors cursor-pointer"
              >
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

      {/* Mensaje si no hay estaciones */}
      {stations.length === 0 && (
        <div className="px-6 py-12 text-center text-white/60">
          <p>No stations found for this network</p>
        </div>
      )}
    </div>
  );
}
