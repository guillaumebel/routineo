export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  userId: string;
  completions: FirestoreTimestamp[];
  createdAt: FirestoreTimestamp;
}

export interface FirestoreTimestamp {
  toDate(): Date;
  seconds: number;
  nanoseconds: number;
}

export interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

export interface User {
  uid: string;
  email: string | null;
}

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddHabit: undefined;
  HabitDetail: { habitId: string };
};

export type TabParamList = {
  HomeTab: undefined;
  Profile: undefined;
};
