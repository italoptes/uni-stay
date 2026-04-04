import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const TOKEN_KEY = 'unistay.token';
const USER_KEY = 'unistay.user';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (!storedUser) {
      return null;
    }
    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      return;
    }

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, [token]);

  const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    const nextToken = response.data.token;
    setToken(nextToken);
    try {
      const decoded = jwtDecode(nextToken);
      const nextUser = { username: decoded?.sub };
      setUser(nextUser);
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    } catch {
      setUser(null);
      localStorage.removeItem(USER_KEY);
    }

    return nextToken;
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  const value = {
    login,
    logout,
    isAuthenticated: Boolean(token),
    token,
    user,
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
