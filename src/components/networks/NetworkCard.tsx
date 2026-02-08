import Link from 'next/link';
import { Network } from '@/types/networks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';


/**
 * Props for NetworkCard
 */

interface NetworkCardProps {
    network : Network; // network data
}


/**
 * This component shows a single card of the bike network.
 * 
 * Shows: 
 *  - name
 *  - location (city, country)
 *  - company (2 visible, badge with remaining)
 *  - Link for details
 * 
 *  @param network - Object with network data
 * 
 */

export function NetworkCard({ network }: NetworkCardProps){

    // Builds URL for detail view
    const detailUrl = `/networks/${network.id}`;

    // Companies to array
    const companies = normalizeCompanies(network.company);

    // Shows 2 companies
    const displayCompanies = companies.slice(0, 2);
    const remainingCount = companies.length - 2;

      return (
            <div className="group relative px-6 pt-4 pb-6 border-b-1 transition-all duration-200 hover:bg-primary/5 hover:border-primary/20"
            >
      {/* Título de la red */}
      <h3 className="text-2xl font-bold text-primary mb-1">
        {network.name}
      </h3>

      {/* Contenedor de ubicación y compañías */}
      <div className="space-y-2">
        {/* Ubicación */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />
          <span className="text-base">
            {network.location.city}, {network.location.country}
          </span>
        </div>

        {/* Compañías */}
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-orange-500 flex-shrink-0" />
          <div className="flex flex-wrap gap-2 items-center">
            {companies.length > 0 ? (
              <>
                {displayCompanies.map((company, index) => (
                  <span key={index} className="text-base text-muted-foreground">
                    {company}
                    {index < displayCompanies.length - 1 && ','}
                  </span>
                ))}
                
                {remainingCount > 0 && (
                  <Badge 
                    variant="outline" 
                    className="text-sm border-orange-500 text-orange-500"
                  >
                    +{remainingCount}
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-base text-muted-foreground italic">
                No company information
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 
        Flecha simple - Visible por defecto, se oculta en hover 
        Siempre visible en móvil (no hay hover)
      */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 md:group-hover:opacity-0 transition-opacity duration-200">
        <Link 
          href={detailUrl}
          aria-label={`View details for ${network.name}`}
        >
          <ArrowRight className="h-6 w-6 text-orange-500" />
        </Link>
      </div>

      {/* 
        Botón "Details" - Oculto por defecto, aparece en hover (solo desktop)
        En móvil no se muestra (usamos solo la flecha)
      */}
      <div className="hidden md:flex md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 justify-end">
        <Link 
          href={detailUrl}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-orange-200 text-orange-500 font-medium hover:bg-orange-50"
        >
          Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>

  )
}


/**
 * Normalize company input to an array 
 * 
 * The API might return:
 * - null
 * - string: "Company A"
 * - array: ["Company A", "Company B"]
 * 
 * @param company - Value for company -> API
 * @returns Strings array (empty if null)
 */
function normalizeCompanies(company: string[] | string | null): string[] {
  // If it's undefined, returns an empty array
  if (!company) {
    return [];
  }

  // If it's an array, returns the array
  if (Array.isArray(company)) {
    return company;
  }

  // If it's a string, turns it into a single string array
    return [company];
}