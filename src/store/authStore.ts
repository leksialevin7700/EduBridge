import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Mock data - In a real app, this would be fetched from an API
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    subjects: ['Math', 'Science'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Tutor',
    email: 'tutor@example.com',
    role: 'tutor',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Experienced math and science tutor with 5 years of teaching experience.',
    subjects: ['Math', 'Science', 'Physics'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(user => user.email === email);
        
        if (user && password === 'password') { // In a real app, we'd use proper password validation
          set({ user, isAuthenticated: true, isLoading: false });
          resolve();
        } else {
          set({ isLoading: false });
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },
  
  register: async (name: string, email: string, password: string, role: UserRole) => {
    set({ isLoading: true });
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const userExists = mockUsers.some(user => user.email === email);
        
        if (userExists) {
          set({ isLoading: false });
          reject(new Error('User already exists'));
        } else {
          const newUser: User = {
            id: String(mockUsers.length + 1),
            name,
            email,
            role,
            createdAt: new Date().toISOString(),
          };
          
          mockUsers.push(newUser);
          set({ user: newUser, isAuthenticated: true, isLoading: false });
          resolve();
        }
      }, 1000);
    });
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));