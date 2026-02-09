// Client component for managing state
'use client'

import { useState } from 'react';
import { Network } from '@/types/networks';
import { NetworkCard } from './NetworkCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

/**
 * Props for NetworkList component
 */
interface NetworkListProps {
  networks: Network[]; 
}


const NETWORKS_PER_PAGE = 7; 


/**
 * This components renders the complete list of bike networks with pagination
 * 
 * Responsibilities:
 * - Validates available networks
 * - Renders a message if the list is empty
 * - Maps each network to a Card
 * - Handles pagination (client-side)
 * 
 * @param networks - Network array
 */
export function NetworkList({ networks }: NetworkListProps) {

    const [currentPage, setCurrentPage] = useState(1); // controls current page

    console.log(networks.length)
    //Early return pattern to avoid nesting
    // If there aren't any networks, desplay message: 
    if (!networks || networks.length === 0) {
        return (
        <div className="flex items-center justify-center min-h-400">
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

    // Calculate pagination values
    const totalPages = Math.ceil(networks.length / NETWORKS_PER_PAGE);
    const startIndex = (currentPage - 1) * NETWORKS_PER_PAGE;
    const endIndex = startIndex + NETWORKS_PER_PAGE;
    const currentNetworks = networks.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of the list smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
        // Show all pages if total is small
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('ellipsis');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 2);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('ellipsis');
            }
        }

        return pages;
    };


    return (
           <div className="w-full space-y-6">
            {/* Networks list */}
            <div className="space-y-4">
                {currentNetworks.map((network) => (
                <NetworkCard 
                    key={network.id} 
                    network={network} 
                />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent className="text-torres-bay-950">
                        {/* Previous button */}
                        <PaginationItem>
                        <PaginationPrevious 
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? 'pointer-events-none' : 'cursor-pointer hover:bg-torres-bay-50'}
                        />
                        </PaginationItem>

                        {/* Page numbers */}
                        {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                            {page === 'ellipsis' ? (
                            <PaginationEllipsis />
                            ) : (
                            <PaginationLink
                                onClick={() => handlePageChange(page)}
                                isActive={currentPage === page}
                                className={ `cursor-pointer hover:bg-torres-bay-50 ${currentPage === page ? 'bg-torres-bay-100 border border-torres-bay-200' : ''}`}
                            >
                                {page}
                            </PaginationLink>
                            )}
                        </PaginationItem>
                        ))}

                        {/* Next button */}
                        <PaginationItem>
                        <PaginationNext 
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-torres-bay-50'}
                        />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}

            {/* Results info */}
            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, networks.length)} of {networks.length} bicycle network{networks.length !== 1 ? 's' : ''}
                </p>
            </div>
            </div>
        );
}