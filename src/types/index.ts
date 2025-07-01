export type UserRole = 'client' | 'mayor' | 'moderator';

export type FeedbackFrequency = 'email' | 'call' | 'chat';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  points: number;
  level: string;
  joinDate: string;
  feedbackPreference: FeedbackFrequency;
  clientType: 'individual' | 'advisor' | 'institutional';
  badges: Badge[];
}

export interface TownHall {
  id: number;
  title: string;
  date: string;
  time: string;
  participants: number;
  status: 'upcoming' | 'live' | 'completed';
  topic: string;
  moderator: string;
  zoomLink?: string;
  chatEnabled: boolean;
  discussionPrompts: string[];
  rankings: TownHallRanking[];
}

export interface TownHallRanking {
  id: string;
  question: string;
  options: string[];
  votes: Record<string, number>;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  trending: boolean;
  clientTypeRatings: Record<string, number>;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  points: number;
  earned: boolean;
  icon: string;
  type: 'contributor' | 'explorer' | 'bug_finder' | 'community' | 'special';
  earnedDate?: string;
}

export interface Discussion {
  id: string;
  title: string;
  author: string;
  authorRole: UserRole;
  content: string;
  replies: number;
  likes: number;
  category: string;
  createdAt: string;
  trending: boolean;
  tags: string[];
}

export interface FeedbackTracker {
  id: string;
  page: string;
  element: string;
  feedbackType: 'positive' | 'negative' | 'suggestion';
  content: string;
  timestamp: string;
  userId: string;
  resolved: boolean;
}

export interface HeatmapData {
  page: string;
  clicks: Array<{
    x: number;
    y: number;
    count: number;
  }>;
  scrollDepth: number;
  timeOnPage: number;
}