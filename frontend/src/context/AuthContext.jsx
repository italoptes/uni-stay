import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const TOKEN_KEY = 'unistay.token';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      return;
    }

    localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    const nextToken = response.data;

    setToken(nextToken);

    return nextToken;
  };

  const logout = () => {
    setToken('');
  };

  const value = {
    login,
    logout,
    isAuthenticated: Boolean(token),
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
