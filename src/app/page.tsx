import { getNetworks } from "@/lib/api/citybikes";
import { NetworkList } from '@/components/networks/NetworkList';
import { Bike } from 'lucide-react';


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
    <main>
      <div className="container mx-auto px-4 py-8">
        {/* Header con logo y título */}
        <div className="mb-8 space-y-3">
          {/* Logo + Nombre */}
          <div className="flex items-center gap-2">
            <Bike className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">CycleMap</span>
          </div>

          {/* Título */}
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Discover bike networks
          </h1>

          {/* Descripción */}
          <p className="text-muted-foreground max-w-2xl">
            Lorem ipsum dolor sit amet consectetur. A volutpat adipiscing 
            placerat turpis magna amet faucibus. Arcu praesent viverra 
            pellentesque nisi quam in rhoncus.
          </p>
        </div>

        {/* TODO: Aquí irán los filtros */}

        {/* Layout de dos columnas: Lista + Mapa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna izquierda: Lista de redes */}
          <div>
            <NetworkList networks={networks} />
          </div>

          {/* Columna derecha: Mapa placeholder */}
          <div className="hidden lg:block">
            <div className="sticky top-8 h-[600px] rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/10">
              <p className="text-muted-foreground text-sm">
                Map placeholder (to be implemented)
              </p>
            </div>
          </div>
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