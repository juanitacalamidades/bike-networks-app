import { Network } from '@/types/networks';
import { NetworksHeader } from './NetworksHeader';
import { NetworkList } from './NetworkList';

interface NetworksViewProps {
  networks: Network[];
}

/**
 * NetworksView Component
 * 
 * Composes the main networks view by combining:
 * - NetworksHeader (logo, title, description, filters placeholder)
 * - NetworkList (list of network cards with pagination)
 * 
 * Similar to how the detail view combines NetworkDetailHeader + StationsTable
 */
export function NetworksView({ networks }: NetworksViewProps) {
  return (
    <div className="space-y-6">
      {/* Header: Logo, Title, Description, Filters */}
      <NetworksHeader />
      
      {/* List of networks */}
      <NetworkList networks={networks} />
    </div>
  );
}