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
  
  //throw new Error("Test") --> testing error.tsx

  return (
    <main className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left col: Network list */}
      <div className="w-full lg:w-full h-screen overflow-y-auto scrollbar-hide">
        <div className="p-4 lg:p-10">
          <NetworksView networks={networks} />
        </div>
      </div>
      </main>
  )
}



