export type UserRole = 'student' | 'tutor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  subjects?: string[];
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'other';
  url: string;
  subject: string;
  uploadedBy: {
    id: string;
    name: string;
    role: UserRole;
  };
  createdAt: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  studentId: string;
  studentName: string;
  tutorId: string;
  tutorName: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
}

export interface MentorshipRequest {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: {
    name: string;
    role: UserRole;
    avatar?: string;
  };
  rating: number;
}