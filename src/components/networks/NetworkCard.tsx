import Link from 'next/link';
import { Network } from '@/types/networks';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
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
    const detailUrl = `/network/${network.id}`;

    // Companies to array
    const companies = normalizeCompanies(network.company);

    // Shows 2 companies
    const displayCompanies = companies.slice(0, 2);
    const remainingCount = companies.length - 2;

      return (
        

      <Card className="group relative transition-all gap-0 px-4 py-2 lg:px-6 lg:py-4 duration-200 group-hover/button:bg-torres-bay-100 border-b border-torres-bay-100">
        <CardHeader className='gap-0 mb-1 p-0'>
          <CardTitle className="text-xl/7 text-torres-bay-800">
            {network.name}
          </CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col p-0'>
          {/* Ubicación */}
          <div className="flex items-center mb-2">
            <div className="flex items-center justify-center h-6 w-6 bg-torres-bay-50 rounded mr-2 shrink-0">
              <MapPin className="h-4 w-4 text-grenadier-400" />
            </div>
            <span className="text-sm/7 text-zinc-500">
              {network.location.city}, {network.location.country}
            </span>
          </div>

          {/* Compañías */}
          <div className="flex items-center">
            <div className="flex items-center justify-center h-6 w-6 bg-torres-bay-50 rounded mr-2 shrink-0">
              <Briefcase className="h-4 w-4 text-grenadier-400" />
            </div>
            <div className="flex flex-wrap items-center">
              {companies.length > 0 ? (
                <>
                  {displayCompanies.map((company, index) => (
                    <span key={index} className="text-sm/7 text-zinc-500">
                      {company}
                      {index < displayCompanies.length - 1 && ','}
                    </span>
                  ))}
                  
                  {remainingCount > 0 && (
                    <Badge 
                      variant="outline" 
                      className="text-sm rounded-xs border-grenadier-400 text-grenadier-400"
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
        </CardContent>

       

       {/* 
          Botón animado "Details" con flecha
          - En móvil: solo flecha visible
          - En desktop: flecha siempre visible, texto aparece en hover desde la derecha hacia la izquierda
        */}
        <CardFooter className="absolute right-6 top-1/2 -translate-y-1/2 p-0">
          <Link 
            href={detailUrl}
            className="details-button-animated"
            aria-label={`View details for ${network.name}`}
          >
            <span className="details-text">Details</span>
            <ArrowRight className="details-arrow" />
          </Link>
        </CardFooter>
      </Card>

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