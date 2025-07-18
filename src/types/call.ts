export enum CallStatus {
  RINGING = 'ringing',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  BUSY = 'busy',
  NO_ANSWER = 'no-answer',
  CANCELED = 'canceled',
}

export enum CallAction {
  FORWARDED = 'forwarded',
  VOICEMAIL = 'voicemail',
  HANGUP = 'hangup',
}

export interface Call {
  _id: string;
  callerNumber: string;
  calledNumber: string;
  twilioCallSid: string;
  status: CallStatus;
  action?: CallAction;
  duration?: number;
  voicemailUrl?: string;
  forwardedTo?: string;
  recordingSid?: string;
  metadata?: Record<string, any>;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CallFilters {
  callType: 'all' | 'forwarded' | 'voicemail' | 'hangup';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
} 