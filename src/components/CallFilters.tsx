import React from 'react';
import { CallFilters } from '../types/call';

interface CallFiltersProps {
  filters: CallFilters;
  onFiltersChange: (filters: CallFilters) => void;
}

export const CallFiltersComponent: React.FC<CallFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleCallTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      callType: event.target.value as 'all' | 'forwarded' | 'voicemail' | 'hangup',
    });
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Filters
          </h2>
          <p className="text-gray-300 text-sm mt-1">Filter calls by action type</p>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="callType" className="text-sm font-medium text-gray-300">
            Call Action:
          </label>
          <div className="relative">
            <select
              id="callType"
              value={filters.callType}
              onChange={handleCallTypeChange}
              className="appearance-none backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
            >
              <option value="all" className="bg-slate-800 text-white">All Actions</option>
              <option value="forwarded" className="bg-slate-800 text-white">Forwarded</option>
              <option value="voicemail" className="bg-slate-800 text-white">Voicemail</option>
              <option value="hangup" className="bg-slate-800 text-white">Hangup</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 