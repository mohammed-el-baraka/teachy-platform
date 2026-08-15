import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Course, Tutor, SessionHistoryItem } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  selectedCourse: Course;
  setSelectedCourse: (course: Course) => void;
  activeTutor: Tutor;
  setActiveTutor: (tutor: Tutor) => void;
  courses: Course[];
  tutors: Tutor[];
  history: SessionHistoryItem[];
}

export const INITIAL_COURSES: Course[] = [
  {
    id: 'english-b2',
    title: 'English Course',
    language: 'English',
    flag: '🇺🇸',
    level: 'Intermediate',
    tutorsCount: 142,
    duration: '45 min/session',
    rating: 4.95,
    studentsCount: 3820,
    description: 'Master everyday conversational English, natural phrasing, idioms, and fluent accent reduction with native speakers.',
    topics: ['Daily Small Talk', 'Business English', 'Pronunciation & Slang', 'Debates & Storytelling'],
    bannerColor: 'from-purple-500 to-indigo-600',
    isPopular: true,
  },
  {
    id: 'spanish-conv',
    title: 'Spanish Conversation',
    language: 'Spanish',
    flag: '🇪🇸',
    level: 'Beginner',
    tutorsCount: 88,
    duration: '45 min/session',
    rating: 4.92,
    studentsCount: 2450,
    description: 'Practical Castilian and Latin American conversational Spanish for travel, work, and social fluency.',
    topics: ['Travel & Tapas', 'Grammar in Context', 'Listening Comprehension', 'Cultural Idioms'],
    bannerColor: 'from-amber-500 to-pink-600',
    isPopular: true,
  },
  {
    id: 'french-immersion',
    title: 'French Immersion',
    language: 'French',
    flag: '🇫🇷',
    level: 'Intermediate',
    tutorsCount: 76,
    duration: '45 min/session',
    rating: 4.89,
    studentsCount: 1980,
    description: 'Immersive live speaking practice with native Parisian and Francophone tutors to unlock natural fluency.',
    topics: ['Pronunciation & Liaison', 'Café Culture Conversations', 'Current Affairs', 'Literature & Expression'],
    bannerColor: 'from-blue-500 to-purple-600',
    isPopular: true,
  },
  {
    id: 'german-pro',
    title: 'German Fluency',
    language: 'German',
    flag: '🇩🇪',
    level: 'Advanced',
    tutorsCount: 54,
    duration: '45 min/session',
    rating: 4.87,
    studentsCount: 1420,
    description: 'Conquer German case structures, compound vocabulary, and professional business dialogue with certified tutors.',
    topics: ['Beruf & Karriere', 'Idiomatic Expressions', 'Complex Grammar Mastery', 'German Dialects'],
    bannerColor: 'from-yellow-600 to-amber-700',
  },
  {
    id: 'mandarin-talk',
    title: 'Mandarin Chinese',
    language: 'Chinese',
    flag: '🇨🇳',
    level: 'All Levels',
    tutorsCount: 65,
    duration: '45 min/session',
    rating: 4.94,
    studentsCount: 1680,
    description: 'Tone mastery, pinyin pronunciation, HSK speaking preparation, and real-life situational Mandarin.',
    topics: ['Tonal Perfection', 'Survival Mandarin', 'Business Etiquette', 'Modern Slang'],
    bannerColor: 'from-red-500 to-orange-500',
  },
  {
    id: 'arabic-dialects',
    title: 'Arabic (Darija & MSA)',
    language: 'Arabic',
    flag: '🇲🇦',
    level: 'All Levels',
    tutorsCount: 92,
    duration: '45 min/session',
    rating: 4.98,
    studentsCount: 2100,
    description: 'Learn modern Moroccan Darija, Levantine, or Modern Standard Arabic directly with native teachers.',
    topics: ['Darija Conversational', 'Media Arabic', 'Cultural Nuances', 'Root Vocabulary'],
    bannerColor: 'from-emerald-600 to-teal-600',
    isPopular: true,
  },
];

export const INITIAL_TUTORS: Tutor[] = [
  {
    id: 'sarah-j',
    name: 'Sarah Jenkins',
    nativeLanguage: 'English',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    accent: 'British (Oxford / RP)',
    location: 'London, United Kingdom',
    rating: 4.98,
    reviewsCount: 340,
    hourlyRate: 24,
    bio: 'CELTA-certified teacher with 6+ years specializing in pronunciation and confidence building for non-native professionals.',
    availableNow: true,
    sampleAudioText: '"Hello! I love helping learners sound natural and feel confident in English. See you in class!"',
    languages: ['English (Native)', 'French (B2)'],
  },
  {
    id: 'mateo-r',
    name: 'Mateo Rodriguez',
    nativeLanguage: 'Spanish',
    flag: '🇪🇸',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    accent: 'Castilian (Madrid)',
    location: 'Madrid, Spain',
    rating: 4.95,
    reviewsCount: 280,
    hourlyRate: 20,
    bio: 'Passionate about Spanish culture and conversation. I tailor every lesson to your personal goals and interests.',
    availableNow: true,
    sampleAudioText: '"¡Hola! Let us practice real Spanish without the stress of grammar tables."',
    languages: ['Spanish (Native)', 'English (Fluent)'],
  },
  {
    id: 'claire-d',
    name: 'Claire Dupont',
    nativeLanguage: 'French',
    flag: '🇫🇷',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    accent: 'Metropolitan French',
    location: 'Paris, France',
    rating: 4.96,
    reviewsCount: 195,
    hourlyRate: 26,
    bio: 'Sorbonne graduate and language enthusiast. Specialized in French conversation, slang, and cultural immersion.',
    availableNow: false,
    sampleAudioText: '"Bonjour! Apprenons le français authentique ensemble dans la bonne humeur."',
    languages: ['French (Native)', 'English (C1)', 'Spanish (B1)'],
  },
  {
    id: 'youssef-b',
    name: 'Youssef Benali',
    nativeLanguage: 'Arabic',
    flag: '🇲🇦',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    accent: 'Moroccan Darija & MSA',
    location: 'Casablanca, Morocco',
    rating: 4.99,
    reviewsCount: 412,
    hourlyRate: 18,
    bio: 'Polyglot educator passionate about conversational Arabic and Moroccan culture. Engaging, friendly, and practical.',
    availableNow: true,
    sampleAudioText: '"Marhaban! Ready to speak Arabic naturally from day one? Let us get started."',
    languages: ['Arabic (Native)', 'French (Fluent)', 'English (Fluent)'],
  },
];

export const INITIAL_HISTORY: SessionHistoryItem[] = [
  {
    id: 'hist-1',
    courseTitle: 'English Course',
    language: 'English',
    flag: '🇺🇸',
    tutorName: 'Sarah Jenkins',
    tutorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    date: 'Yesterday, 17:30',
    duration: '45 mins',
    topic: 'Everyday Idioms, Phrasal Verbs & Slang',
    pronunciationScore: 92,
    fluencyScore: 88,
    feedback: 'Excellent conversational flow! Great usage of "hit the nail on the head". Focus slightly on linking "r" sounds in rapid speech.',
    notes: ['Mastered: "cut corners", "spill the beans"', 'Pronunciation practice: "world", "comfortable", "thorough"'],
  },
  {
    id: 'hist-2',
    courseTitle: 'Spanish Conversation',
    language: 'Spanish',
    flag: '🇪🇸',
    tutorName: 'Mateo Rodriguez',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    date: '3 days ago, 14:00',
    duration: '45 mins',
    topic: 'Ordering Food & Navigating Tapas Bars',
    pronunciationScore: 89,
    fluencyScore: 85,
    feedback: 'Very confident ordering in Spanish! Good handling of subjunctive mood when asking politely.',
    notes: ['Phrases: "¿Me podría traer la cuenta, por favor?"', 'Vocabulary: sobremesa, ración, tapear'],
  },
  {
    id: 'hist-3',
    courseTitle: 'French Immersion',
    language: 'French',
    flag: '🇫🇷',
    tutorName: 'Claire Dupont',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    date: 'Last week, 19:00',
    duration: '45 mins',
    topic: 'French Café Culture & Daily Routine',
    pronunciationScore: 94,
    fluencyScore: 90,
    feedback: 'Splendid pronunciation of nasal vowels! High natural rhythm throughout the discussion.',
    notes: ['Practiced: "un café allongé", "faire la grasse matinée"', 'Tip: keep mouth round on the "u" sound'],
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('teachy_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    // Default demo logged-in user so the Course page works right out of the box
    return {
      name: 'Mohammed',
      email: 'mohammed@teachy.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      targetLanguage: 'English',
      nativeLanguage: 'Arabic',
      level: 'B2 Upper-Intermediate',
      streakDays: 14,
      hoursPracticed: 28.5,
      completedLessons: 18,
    };
  });

  const [selectedCourse, setSelectedCourse] = useState<Course>(INITIAL_COURSES[0]);
  const [activeTutor, setActiveTutor] = useState<Tutor>(INITIAL_TUTORS[0]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('teachy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('teachy_user');
    }
  }, [user]);

  const login = async (email: string, _password?: string): Promise<boolean> => {
    // Simulated instant login
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const loggedUser: User = {
      name: formattedName || 'Learner',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      targetLanguage: 'English',
      nativeLanguage: 'Arabic',
      level: 'B2 Upper-Intermediate',
      streakDays: 14,
      hoursPracticed: 28.5,
      completedLessons: 18,
    };
    setUser(loggedUser);
    return true;
  };

  const signup = async (name: string, email: string, _password?: string): Promise<boolean> => {
    const newUser: User = {
      name: name.trim() || 'New Learner',
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      targetLanguage: 'English',
      nativeLanguage: 'French',
      level: 'A2 Beginner',
      streakDays: 1,
      hoursPracticed: 0.5,
      completedLessons: 1,
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        selectedCourse,
        setSelectedCourse,
        activeTutor,
        setActiveTutor,
        courses: INITIAL_COURSES,
        tutors: INITIAL_TUTORS,
        history: INITIAL_HISTORY,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
