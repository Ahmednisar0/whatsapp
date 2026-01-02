'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token) {
        setIsLoggedIn(true);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    localStorage.setItem('token', 'token_' + Date.now());
    localStorage.setItem('user', JSON.stringify({ email }));
    setIsLoggedIn(true);
    setUser({ email });
  };

  const signup = async (email: string, password: string) => {
    localStorage.setItem('token', 'token_' + Date.now());
    localStorage.setItem('user', JSON.stringify({ email }));
    setIsLoggedIn(true);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, signup }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
