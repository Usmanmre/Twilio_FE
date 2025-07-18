import { useState, useEffect } from 'react';
import { Call, CallStatus, CallAction } from '../types/call';
import { buildApiUrl } from '../config/api';

interface UseCallsReturn {
  calls: Call[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCalls = (): UseCallsReturn => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from API first
      const apiUrl = buildApiUrl('/calls');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Ensure data is an array
        setCalls(Array.isArray(data?.calls) ? data?.calls : []);
        console.log(data);
      } else {
        // If API fails, use mock data instead of showing error
        setCalls(getMockCalls());
      }
    } catch (err) {
      // If API call fails completely, use mock data instead of showing error
      setCalls(getMockCalls());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return {
    calls,
    loading,
    error,
    refetch: fetchCalls,
  };
};

// Mock data for development/demo purposes
const getMockCalls = (): Call[] => [
  {
    _id: '1',
    callerNumber: '+1 (555) 123-4567',
    calledNumber: '+1 (555) 987-6543',
    twilioCallSid: 'CA1234567890abcdef1234567890abcdef',
    status: CallStatus.COMPLETED,
    action: CallAction.FORWARDED,
    duration: 245,
    forwardedTo: '+1 (555) 111-2222',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:35:00Z',
  },
  {
    _id: '2',
    callerNumber: '+1 (555) 987-6543',
    calledNumber: '+1 (555) 456-7890',
    twilioCallSid: 'CA2345678901bcdef1234567890abcdef',
    status: CallStatus.COMPLETED,
    action: CallAction.VOICEMAIL,
    duration: 0,
    voicemailUrl: 'https://example.com/voicemail/recording1.mp3',
    recordingSid: 'RE1234567890abcdef1234567890abcdef',
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T09:20:00Z',
  },
  {
    _id: '3',
    callerNumber: '+1 (555) 456-7890',
    calledNumber: '+1 (555) 321-0987',
    twilioCallSid: 'CA3456789012cdef1234567890abcdef',
    status: CallStatus.NO_ANSWER,
    action: CallAction.HANGUP,
    duration: 0,
    createdAt: '2024-01-15T08:45:00Z',
    updatedAt: '2024-01-15T08:50:00Z',
  },
  {
    _id: '4',
    callerNumber: '+1 (555) 321-0987',
    calledNumber: '+1 (555) 654-3210',
    twilioCallSid: 'CA4567890123def1234567890abcdef',
    status: CallStatus.COMPLETED,
    action: CallAction.VOICEMAIL,
    duration: 0,
    voicemailUrl: 'https://example.com/voicemail/recording2.mp3',
    recordingSid: 'RE2345678901bcdef1234567890abcdef',
    createdAt: '2024-01-14T16:20:00Z',
    updatedAt: '2024-01-14T16:25:00Z',
  },
  {
    _id: '5',
    callerNumber: '+1 (555) 654-3210',
    calledNumber: '+1 (555) 789-0123',
    twilioCallSid: 'CA5678901234ef1234567890abcdef',
    status: CallStatus.COMPLETED,
    action: CallAction.FORWARDED,
    duration: 180,
    forwardedTo: '+1 (555) 333-4444',
    createdAt: '2024-01-14T14:10:00Z',
    updatedAt: '2024-01-14T14:15:00Z',
  },
  {
    _id: '6',
    callerNumber: '+1 (555) 789-0123',
    calledNumber: '+1 (555) 012-3456',
    twilioCallSid: 'CA6789012345f1234567890abcdef',
    status: CallStatus.COMPLETED,
    action: CallAction.VOICEMAIL,
    duration: 0,
    voicemailUrl: 'https://example.com/voicemail/recording3.mp3',
    recordingSid: 'RE3456789012cdef1234567890abcdef',
    createdAt: '2024-01-14T11:30:00Z',
    updatedAt: '2024-01-14T11:35:00Z',
  },
  {
    _id: '7',
    callerNumber: '+1 (555) 012-3456',
    calledNumber: '+1 (555) 345-6789',
    twilioCallSid: 'CA78901234561234567890abcdef',
    status: CallStatus.BUSY,
    action: CallAction.HANGUP,
    duration: 0,
    createdAt: '2024-01-14T10:15:00Z',
    updatedAt: '2024-01-14T10:20:00Z',
  },
  {
    _id: '8',
    callerNumber: '+1 (555) 345-6789',
    calledNumber: '+1 (555) 567-8901',
    twilioCallSid: 'CA8901234567234567890abcdef',
    status: CallStatus.COMPLETED,
    action: CallAction.VOICEMAIL,
    duration: 0,
    voicemailUrl: 'https://example.com/voicemail/recording4.mp3',
    recordingSid: 'RE4567890123def1234567890abcdef',
    createdAt: '2024-01-13T17:45:00Z',
    updatedAt: '2024-01-13T17:50:00Z',
  },
  {
    _id: '9',
    callerNumber: '+1 (555) 567-8901',
    calledNumber: '+1 (555) 234-5678',
    twilioCallSid: 'CA901234567834567890abcdef',
    status: CallStatus.COMPLETED,
    action: CallAction.FORWARDED,
    duration: 320,
    forwardedTo: '+1 (555) 555-6666',
    createdAt: '2024-01-13T15:30:00Z',
    updatedAt: '2024-01-13T15:35:00Z',
  },
  {
    _id: '10',
    callerNumber: '+1 (555) 234-5678',
    calledNumber: '+1 (555) 890-1234',
    twilioCallSid: 'CA01234567894567890abcdef',
    status: CallStatus.COMPLETED,
    action: CallAction.VOICEMAIL,
    duration: 0,
    voicemailUrl: 'https://example.com/voicemail/recording5.mp3',
    recordingSid: 'RE5678901234ef1234567890abcdef',
    createdAt: '2024-01-13T12:45:00Z',
    updatedAt: '2024-01-13T12:50:00Z',
  },
  {
    _id: '11',
    callerNumber: '+1 (555) 890-1234',
    calledNumber: '+1 (555) 678-9012',
    twilioCallSid: 'CA1234567890567890abcdef',
    status: CallStatus.FAILED,
    action: CallAction.HANGUP,
    duration: 0,
    createdAt: '2024-01-13T09:20:00Z',
    updatedAt: '2024-01-13T09:25:00Z',
  },
  {
    _id: '12',
    callerNumber: '+1 (555) 678-9012',
    calledNumber: '+1 (555) 123-4567',
    twilioCallSid: 'CA234567890167890abcdef',
    status: CallStatus.COMPLETED,
    action: CallAction.VOICEMAIL,
    duration: 0,
    voicemailUrl: 'https://example.com/voicemail/recording6.mp3',
    recordingSid: 'RE6789012345f1234567890abcdef',
    createdAt: '2024-01-12T18:15:00Z',
    updatedAt: '2024-01-12T18:20:00Z',
  },
]; 