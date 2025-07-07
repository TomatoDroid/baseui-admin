import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { sleep } from './utils';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
}

const key = 'auth.user';

function getStoredUser() {
  return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(getStoredUser());
  const isAuthenticated = !!user;

  const login = useCallback(async (username: string) => {
    await sleep(1000);

    setStoredUser(username);
    setUser(username);
  }, []);

  const logout = useCallback(async () => {
    await sleep(250);

    setStoredUser(null);
    setUser(null);
  }, []);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return <AuthContext value={{ isAuthenticated, login, logout, user }}>{children}</AuthContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('authContext is not initialized');
  }
  return context;
};
