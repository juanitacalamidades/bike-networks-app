'use client';

import { ArrowLeft, MapPin, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { normalizeCompanies } from '@/lib/api/citybikes';
import type { Location } from '@/types/networks';

interface NetworkDetailHeaderProps {
  networkId: string;
  name: string;
  location: Location;
  company: string | string[] | null;
}

export function NetworkDetailHeader({ 
  networkId, 
  name, 
  location, 
  company 
}: NetworkDetailHeaderProps) {
  const router = useRouter();
  const companies = normalizeCompanies(company);

  return (
    <div className="relative h-64 overflow-hidden px-10">
      {/* Hero image - usando Unsplash con una imagen de bicicletas */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://plus.unsplash.com/premium_photo-1684313874026-b26d35ae07e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >

       {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/0 to-torres-bay-800" />
      </div>

      {/* Contenido sobre la imagen */}
      <div className="relative h-full flex flex-col justify-between py-6 text-white">
        {/* Botón de volver */}
        <button
          onClick={() => router.back()}
          className="self-start flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Info de la red */}
        <div className="space-y-3">
          {/* Nombre de la red */}
          <h1 className="text-4xl font-bold tracking-tight">
            {name}
          </h1>

          {/* Ubicación */}
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              {location.city}, {location.country}
            </span>
          </div>

          {/* Compañías */}
          {companies.length > 0 && (
            <div className="flex items-start gap-2 text-white/90">
              <Briefcase className="h-4 w-4 mt-0.5 shrink-0" />
              <span className="text-sm">
                {companies.join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
