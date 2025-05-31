import { create } from 'zustand';
import { Resource } from '../types';

interface ResourceState {
  resources: Resource[];
  isLoading: boolean;
  error: string | null;
  fetchResources: () => Promise<void>;
  addResource: (resource: Omit<Resource, 'id' | 'createdAt'>) => Promise<void>;
}

// Mock data
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    description: 'A comprehensive guide to basic algebraic concepts for beginners.',
    type: 'document',
    url: 'https://example.com/algebra-intro.pdf',
    subject: 'Math',
    uploadedBy: {
      id: '2',
      name: 'Jane Tutor',
      role: 'tutor',
    },
    createdAt: '2023-09-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'The Water Cycle Explained',
    description: 'Video tutorial explaining the water cycle process in detail.',
    type: 'video',
    url: 'https://example.com/water-cycle-video',
    subject: 'Science',
    uploadedBy: {
      id: '2',
      name: 'Jane Tutor',
      role: 'tutor',
    },
    createdAt: '2023-10-05T14:45:00Z',
  },
  {
    id: '3',
    title: 'Essay Writing Tips',
    description: 'Document with tips and tricks for writing better essays.',
    type: 'document',
    url: 'https://example.com/essay-tips.pdf',
    subject: 'English',
    uploadedBy: {
      id: '4',
      name: 'Mark Johnson',
      role: 'tutor',
    },
    createdAt: '2023-11-20T09:15:00Z',
  },
];

export const useResourceStore = create<ResourceState>((set) => ({
  resources: [],
  isLoading: false,
  error: null,
  
  fetchResources: async () => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        set({ resources: mockResources, isLoading: false });
        resolve();
      }, 1000);
    });
  },
  
  addResource: async (resource) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newResource: Resource = {
          ...resource,
          id: String(mockResources.length + 1),
          createdAt: new Date().toISOString(),
        };
        
        mockResources.push(newResource);
        set((state) => ({
          resources: [...state.resources, newResource],
          isLoading: false,
        }));
        
        resolve();
      }, 1000);
    });
  },
}));