import { getNetworkById } from "@/lib/api/citybikes";
import { NetworkDetailHeader } from '@/components/networks/NetworkDetailHeader';
import { StationsTable } from '@/components/stations/StationsTable';
import NetworkMapController from '@/components/map/NetworkMapController';
import { notFound } from 'next/navigation';

interface NetworkDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Network Detail Page
 *
 * Server Component que:
 *  - Fetch al detalle de la red y sus estaciones desde la API.
 *  - Renderiza el header de la red y la tabla de estaciones.
 *  - Incluye NetworkMapController (cliente) que comunica las estaciones
 *    al mapa persistente via MapContext: pinta markers y hace flyTo.
 *
 * Route: /network/[id]
 */
export default async function NetworkDetailPage({ params }: NetworkDetailPageProps) {
  const { id } = await params;

  let networkDetail;

  try {
    networkDetail = await getNetworkById(id);
  } catch (error) {
    notFound();
  }

  const { name, location, company, stations } = networkDetail;

  return (
    <main className="flex flex-col h-full">
      <div className="overflow-y-auto scrollbar-hide">
        <div className="space-y-0">
          <NetworkDetailHeader
            networkId={id}
            name={name}
            location={location}
            company={company}
          />
          <StationsTable stations={stations} />
        </div>
      </div>

      {/**
       * Componente invisible — solo efectos.
       * Comunica las estaciones al mapa y hace flyTo al montar.
       * Limpia los markers al desmontar (al salir de esta ruta).
       */}
      <NetworkMapController stations={stations} location={location} />
    </main>
  );
}