
import * as React from 'react'
import { User } from './features/users/data/schema';

interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  const login = async (user: User) => {
    setUser(user);
  };

  const logout = async () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
