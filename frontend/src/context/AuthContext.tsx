import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthState } from '../types';
import axios from '../lib/axios';

interface AuthContextType extends AuthState {
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  register: (token: string, user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token and fetch user profile
          const response = await axios.get('/auth/profile');
          setState({
            user: response.data,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('token');
          setState((prev) => ({ ...prev, token: null, isAuthenticated: false, isLoading: false }));
        }
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();
  }, []);

  const login = (token: string, user: AuthUser) => {
    localStorage.setItem('token', token);
    setState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const register = (token: string, user: AuthUser) => {
    localStorage.setItem('token', token);
    setState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
