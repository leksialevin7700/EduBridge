import { create } from 'zustand';
import { Session, MentorshipRequest } from '../types';

interface SessionState {
  sessions: Session[];
  mentorshipRequests: MentorshipRequest[];
  isLoading: boolean;
  error: string | null;
  fetchSessions: (userId: string) => Promise<void>;
  fetchMentorshipRequests: (tutorId: string) => Promise<void>;
  createMentorshipRequest: (request: Omit<MentorshipRequest, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  acceptMentorshipRequest: (requestId: string, sessionDetails: Partial<Session>) => Promise<void>;
  declineMentorshipRequest: (requestId: string) => Promise<void>;
}

// Mock data
const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Algebra Help Session',
    description: 'Help with quadratic equations and factoring.',
    subject: 'Math',
    date: '2023-12-15',
    startTime: '15:00',
    endTime: '16:00',
    studentId: '1',
    studentName: 'John Student',
    tutorId: '2',
    tutorName: 'Jane Tutor',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Physics Concepts Review',
    description: 'Review of basic physics concepts and problem solving.',
    subject: 'Physics',
    date: '2023-12-20',
    startTime: '14:00',
    endTime: '15:30',
    studentId: '1',
    studentName: 'John Student',
    tutorId: '2',
    tutorName: 'Jane Tutor',
    status: 'pending',
  },
];

const mockMentorshipRequests: MentorshipRequest[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'John Student',
    subject: 'Math',
    message: 'I need help with calculus, specifically integration techniques.',
    status: 'pending',
    createdAt: '2023-12-01T09:30:00Z',
  },
  {
    id: '2',
    studentId: '3',
    studentName: 'Sarah Wilson',
    subject: 'Science',
    message: 'Looking for help with my biology homework on cell structures.',
    status: 'accepted',
    createdAt: '2023-12-05T14:15:00Z',
  },
];

export const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  mentorshipRequests: [],
  isLoading: false,
  error: null,
  
  fetchSessions: async (userId: string) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Filter sessions based on user ID (either as student or tutor)
        const userSessions = mockSessions.filter(
          session => session.studentId === userId || session.tutorId === userId
        );
        
        set({ sessions: userSessions, isLoading: false });
        resolve();
      }, 1000);
    });
  },
  
  fetchMentorshipRequests: async (tutorId: string) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // In a real app, we'd filter requests that are assigned to this tutor
        set({ mentorshipRequests: mockMentorshipRequests, isLoading: false });
        resolve();
      }, 1000);
    });
  },
  
  createMentorshipRequest: async (request) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newRequest: MentorshipRequest = {
          ...request,
          id: String(mockMentorshipRequests.length + 1),
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        
        mockMentorshipRequests.push(newRequest);
        set((state) => ({
          mentorshipRequests: [...state.mentorshipRequests, newRequest],
          isLoading: false,
        }));
        
        resolve();
      }, 1000);
    });
  },
  
  acceptMentorshipRequest: async (requestId: string, sessionDetails) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Update request status
        const requestIndex = mockMentorshipRequests.findIndex(req => req.id === requestId);
        if (requestIndex !== -1) {
          mockMentorshipRequests[requestIndex].status = 'accepted';
          
          // Create a new session based on the request
          const request = mockMentorshipRequests[requestIndex];
          const newSession: Session = {
            id: String(mockSessions.length + 1),
            title: sessionDetails.title || `${request.subject} Tutoring Session`,
            description: sessionDetails.description || request.message,
            subject: request.subject,
            date: sessionDetails.date || new Date().toISOString().split('T')[0],
            startTime: sessionDetails.startTime || '15:00',
            endTime: sessionDetails.endTime || '16:00',
            studentId: request.studentId,
            studentName: request.studentName,
            tutorId: '2', // This would be the current user's ID in a real app
            tutorName: 'Jane Tutor', // This would be the current user's name in a real app
            status: 'pending',
          };
          
          mockSessions.push(newSession);
          
          set((state) => ({
            mentorshipRequests: [...mockMentorshipRequests],
            sessions: [...state.sessions, newSession],
            isLoading: false,
          }));
        } else {
          set({ isLoading: false, error: 'Request not found' });
        }
        
        resolve();
      }, 1000);
    });
  },
  
  declineMentorshipRequest: async (requestId: string) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const requestIndex = mockMentorshipRequests.findIndex(req => req.id === requestId);
        if (requestIndex !== -1) {
          mockMentorshipRequests[requestIndex].status = 'declined';
          
          set({
            mentorshipRequests: [...mockMentorshipRequests],
            isLoading: false,
          });
        } else {
          set({ isLoading: false, error: 'Request not found' });
        }
        
        resolve();
      }, 1000);
    });
  },
}));