'use client';

import { Bike } from 'lucide-react';

export function NetworksHeader() {
  return (
    <div className="space-y-6">
      {/* Logo + Nombre */}
      <div className="flex items-center gap-2">
        <Bike className="h-8 w-8 text-grenadier-400" />
        <span className="text-xl font-bold text-grenadier-400">CycleMap</span>
      </div>

      {/* Título y descripción */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-torres-bay-800">
          Discover bike networks
        </h1>

        <p className="text-sm text-zinc-500">
          Lorem ipsum dolor sit amet consectetur. A volutpat adipiscing 
          placerat turpis magna sem tempor amet faucibus. Arcu praesent 
          viverra pellentesque nisi quam in rhoncus.
        </p>
      </div>

      {/* TODO: Aquí irán los filtros (Search + Country) */}
    </div>
  );
}