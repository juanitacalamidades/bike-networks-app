import { Network } from '@/types/networks';
import { NetworkCard } from './NetworkCard';

/**
 * Props for NetworkList component
 */
interface NetworkListProps {
  networks: Network[]; 
}

/**
 * This components renders the complete list of bike networks
 * 
 * Responsabilitues:
 * - Validates available networks
 * - Renders a message if the list is empty
 * - Maps each network to a Card
 * - Responsive grid layout
 * 
 * @param networks - Network array
 */
export function NetworkList({ networks }: NetworkListProps) {

    //Early return pattern to avoid nesting
    // If there aren't any networks, desplay message: 
    if (!networks || networks.length === 0) {
        return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-2">
            <p className="text-lg font-medium text-muted-foreground">
                No bicycle networks found
            </p>
            <p className="text-sm text-muted-foreground">
                Try adjusting your filters or check back later
            </p>
            </div>
        </div>
        );
    }

    return (
          <div className="w-full">
            {/* 
                Lista SIN espaciado vertical de 40px entre items
                space-y-10 = 2.5rem = 40px
            */}
            <div className="">
                {networks.map((network) => (
                <NetworkCard 
                    key={network.id} 
                    network={network} 
                />
                ))}
            </div>
        {/* Results */}
        <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
            Showing {networks.length} bicycle network{networks.length !== 1 ? 's' : ''}
            </p>
        </div>
        </div>
    );
}