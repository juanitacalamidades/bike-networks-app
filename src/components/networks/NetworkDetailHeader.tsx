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
      {/* Hero image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://plus.unsplash.com/premium_photo-1684313874026-b26d35ae07e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >

       {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/0 to-torres-bay-800" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between py-6 text-base-white">
        {/* GoBack button */}
        <button
          onClick={() => router.back()}
          className="self-start flex items-center justify-center w-10 h-10 rounded-full bg-base-white cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-grenadier-400" />
        </button>

        {/* Network info*/}
        <div>
          {/* Name */}
          <h1 className="mb-2 text-3xl font-bold">
            {name}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-2 text-base-white">
            <MapPin className="h-4 w-4" />
            <span className="text-base text-torres-bay-100">
              {location.city}, {location.country}
            </span>
          </div>

          {/* Companies */}
          {companies.length > 0 && (
            <div className="flex items-start gap-2 text-base-white">
              <Briefcase className="h-4 w-4 mt-0.5 shrink-0" />
              <span className="text-base text-torres-bay-100">
                {companies.join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
