import { getNetworkById } from "@/lib/api/citybikes";
import { NetworkDetailHeader } from '@/components/networks/NetworkDetailHeader';
import { StationsTable } from '@/components/stations/StationsTable';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface NetworkDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Network Detail Page
 * 
 * Server Component that:
 * - Fetches network details and stations from the API
 * - Displays network information with hero image
 * - Shows stations table with sorting capabilities
 * 
 * Route: /network/[id]
 */
export default async function NetworkDetailPage({ params }: NetworkDetailPageProps) {
  // Await params in Next.js 15+
  const { id } = await params;
  
  let networkDetail;

  try {
    networkDetail = await getNetworkById(id);
  } catch (error) {
    // If network not found, show 404
    notFound();
  }

  const { name, location, company, stations } = networkDetail;

  return (
    <main className="flex flex-col lg:flex-row h-screen">
      {/* Columna izquierda: Detalle de la red */}
      <div className="w-full lg:w-[40%] overflow-y-auto scrollbar-hide">
        <div className="">
          <div className="space-y-0">
            {/* Header con imagen hero y info de la red */}
            <NetworkDetailHeader
              networkId={id}
              name={name}
              location={location}
              company={company}
            />

            {/* Tabla de estaciones */}
            <StationsTable stations={stations} />
          </div>
        </div>
      </div>

      {/* Columna derecha: Mapa de estaciones (ocupa todo el espacio restante) */}
      <div className="hidden lg:block lg:flex-1 relative">
        <div className="sticky top-0 h-screen w-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/10">
          <p className="text-muted-foreground text-sm">
            Stations map (to be implemented)
          </p>
        </div>
      </div>
    </main>
  );
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: NetworkDetailPageProps): Promise<Metadata> {
  // Await params in Next.js 15+
  const { id } = await params;
  
  try {
    const networkDetail = await getNetworkById(id);
    
    return {
      title: `${networkDetail.name} - ${networkDetail.location.city} | CycleMap`,
      description: `Explore ${networkDetail.name} bicycle network in ${networkDetail.location.city}, ${networkDetail.location.country}. Find bike stations, availability, and real-time information.`,
    };
  } catch {
    return {
      title: 'Network Not Found | CycleMap',
    };
  }
}
