import { getNetworks } from "@/lib/api/citybikes";
import { NetworksView } from '@/components/networks/NetworksView';

/**
 * Home page.
 * 
 * This is a next.js Server Component that:
 * - Gets data from the API
 * - Sends data to NetworkList to render
 * - Manages errors (Next.js shows error.tsx if there is any)
 * 
 * Features:
 * - Executes on the server side
 * - JS is not send to the client with this component
 * - SEO friendly (renders the html already)
 * - Can fetch data directly
 */


export default async function Home() {

  // Gets bike networks
  // Next waits until the promise is resolved
  const networks = await getNetworks();

  return (
    <main className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Columna izquierda: Lista de redes */}
      <div className="w-full lg:w-[40%] h-screen overflow-y-auto scrollbar-hide">
        <div className="p-10">
          <NetworksView networks={networks} />
        </div>
      </div>

      {/* Columna derecha: Mapa (ocupa todo el espacio restante) */}
      <div className="hidden lg:block lg:flex-1 relative h-screen">
        <div className="sticky top-0 h-screen w-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/10">
          <p className="text-muted-foreground text-sm">
            Map placeholder (to be implemented)
          </p>
        </div>
      </div>
      </main>
  )
}



/**
 * Metadata for SEO
 * Next.js needs this to generate <title> & <meta>
 */
export const metadata = {
  title: 'Bicycle Networks | Explore Bike Sharing Worldwide',
  description: 'Discover and explore bicycle sharing networks from cities around the world. Find bike stations, availability, and network information.',
};