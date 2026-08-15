export interface Course {
  id: string;
  title: string;
  language: string;
  flag: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  tutorsCount: number;
  duration: string;
  rating: number;
  studentsCount: number;
  description: string;
  topics: string[];
  bannerColor: string;
  isPopular?: boolean;
}

export interface Tutor {
  id: string;
  name: string;
  nativeLanguage: string;
  flag: string;
  avatar: string;
  accent: string;
  location: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  bio: string;
  availableNow: boolean;
  sampleAudioText: string;
  languages: string[];
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  targetLanguage: string;
  nativeLanguage: string;
  level: string;
  streakDays: number;
  hoursPracticed: number;
  completedLessons: number;
}

export interface SessionHistoryItem {
  id: string;
  courseTitle: string;
  language: string;
  flag: string;
  tutorName: string;
  tutorAvatar: string;
  date: string;
  duration: string;
  topic: string;
  pronunciationScore: number;
  fluencyScore: number;
  feedback: string;
  notes: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'tutor' | 'user' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  correction?: {
    original: string;
    improved: string;
    explanation: string;
  };
}
