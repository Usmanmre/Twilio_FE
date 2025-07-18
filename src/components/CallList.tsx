import React, { useState, useMemo } from 'react';
import { Call, CallFilters, PaginationInfo, CallAction } from '../types/call';
import { CallCard } from './CallCard';
import { CallFiltersComponent } from './CallFilters';
import { Pagination } from './Pagination';

interface CallListProps {
  calls: Call[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const ITEMS_PER_PAGE = 6;

export const CallList: React.FC<CallListProps> = ({ calls, loading, error, onRetry }) => {
  const [filters, setFilters] = useState<CallFilters>({ callType: 'all' });
  const [currentPage, setCurrentPage] = useState(1);

  // Sort and filter calls based on selected filters
  const filteredCalls = useMemo(() => {
    if (!calls || !Array.isArray(calls)) {
      return [];
    }
    
    let filtered = calls.filter(call => {
      if (filters.callType !== 'all' && call.action !== filters.callType) {
        return false;
      }
      return true;
    });

    // Sort by latest first (newest createdAt first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return filtered;
  }, [calls, filters]);

  // Calculate pagination
  const pagination: PaginationInfo = useMemo(() => {
    const totalItems = filteredCalls?.length || 0;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    return {
      currentPage,
      totalPages: Math.max(1, totalPages),
      totalItems,
      itemsPerPage: ITEMS_PER_PAGE,
    };
  }, [filteredCalls?.length, currentPage]);

  // Get current page items
  const currentPageCalls = useMemo(() => {
    if (!filteredCalls || !Array.isArray(filteredCalls)) {
      return [];
    }
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCalls.slice(startIndex, endIndex);
  }, [filteredCalls, currentPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <CallFiltersComponent filters={filters} onFiltersChange={setFilters} />
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-12 shadow-xl">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin mb-6"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-500 rounded-full animate-spin animation-delay-1000"></div>
              </div>
              <p className="text-gray-300 text-lg font-medium">Loading calls...</p>
              <p className="text-gray-400 text-sm mt-2">Fetching your call data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CallFiltersComponent filters={filters} onFiltersChange={setFilters} />
      
      {/* Call List */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">
        {currentPageCalls.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl mb-6 backdrop-blur-sm">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No calls found</h3>
            <p className="text-gray-300">No calls match your current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {(currentPageCalls || []).map(call => (
              <CallCard key={call._id} call={call} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      )}
    </div>
  );
}; 