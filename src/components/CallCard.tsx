import React from 'react';
import { Call } from '../types/call';
import { formatDuration, formatTimestamp, getStatusColor, getActionColor, getStatusIcon, getActionIcon } from '../utils/formatters';

interface CallCardProps {
  call: Call;
}

export const CallCard: React.FC<CallCardProps> = ({ call }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden">
      {/* Header with status indicator */}
      <div className={`px-6 py-4 border-b ${getStatusColor(call.status)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl">{getStatusIcon(call.status)}</span>
            </div>
            <div>
              <span className="font-bold text-sm capitalize text-gray-800">
                {call.status.replace('-', ' ')}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {formatTimestamp(call.createdAt)}
          </div>
        </div>
      </div>

      {/* Call Details */}
      <div className="p-6 space-y-4">
        {/* Phone Numbers */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="text-gray-500 text-xs font-medium">From</span>
                <div className="font-semibold text-gray-900">{call.callerNumber}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400">Duration</div>
              <div className="text-sm font-medium text-gray-700">
                {call.duration ? formatDuration(call.duration) : 'No duration'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <span className="text-gray-500 text-xs font-medium">To</span>
              <div className="font-semibold text-gray-900">{call.calledNumber}</div>
            </div>
          </div>
        </div>

        {/* Action Badge */}
        {call.action && (
          <div className={`inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold border-2 ${getActionColor(call.action)}`}>
            <span className="mr-2 text-lg">{getActionIcon(call.action)}</span>
            {call.action.charAt(0).toUpperCase() + call.action.slice(1)}
          </div>
        )}

        {/* Forwarded To */}
        {call.forwardedTo && (
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Forwarded to:</span> {call.forwardedTo}
            </div>
          </div>
        )}

        {/* Voicemail Link */}
        {call.voicemailUrl && (
          <div className="pt-3 border-t border-gray-100">
            <a
              href={call.voicemailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4 mr-2 group-hover/link:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Listen to Voicemail
            </a>
          </div>
        )}

        {/* Call SID */}
        <div className="text-xs text-gray-400 font-mono bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
          SID: {call.twilioCallSid.slice(-8)}
        </div>
      </div>
    </div>
  );
}; 