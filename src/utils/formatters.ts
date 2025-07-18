import { CallStatus, CallAction } from '../types/call';

export const formatDuration = (seconds?: number): string => {
  if (!seconds || seconds === 0) return '0s';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
};

export const getStatusColor = (status: CallStatus): string => {
  switch (status) {
    case CallStatus.COMPLETED:
      return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200';
    case CallStatus.IN_PROGRESS:
      return 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200';
    case CallStatus.RINGING:
      return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200';
    case CallStatus.FAILED:
    case CallStatus.NO_ANSWER:
    case CallStatus.CANCELED:
      return 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200';
    case CallStatus.BUSY:
      return 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200';
    default:
      return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
  }
};

export const getActionColor = (action?: CallAction): string => {
  switch (action) {
    case CallAction.FORWARDED:
      return 'text-blue-700 bg-blue-50 border-blue-200';
    case CallAction.VOICEMAIL:
      return 'text-purple-700 bg-purple-50 border-purple-200';
    case CallAction.HANGUP:
      return 'text-gray-700 bg-gray-50 border-gray-200';
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200';
  }
};

export const getStatusIcon = (status: CallStatus): string => {
  switch (status) {
    case CallStatus.COMPLETED:
      return '✓';
    case CallStatus.IN_PROGRESS:
      return '⟳';
    case CallStatus.RINGING:
      return '📞';
    case CallStatus.FAILED:
    case CallStatus.NO_ANSWER:
    case CallStatus.CANCELED:
      return '✗';
    case CallStatus.BUSY:
      return '🚫';
    default:
      return '•';
  }
};

export const getActionIcon = (action?: CallAction): string => {
  switch (action) {
    case CallAction.FORWARDED:
      return '↗';
    case CallAction.VOICEMAIL:
      return '🎵';
    case CallAction.HANGUP:
      return '☎';
    default:
      return '•';
  }
}; 