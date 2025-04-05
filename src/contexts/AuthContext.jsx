import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(name, email, password) {
    try {
      const response = await authService.register({ name, email, password });
      setCurrentUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const response = await authService.login({ email, password });
      setCurrentUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    authService.logout();
    setCurrentUser(null);
  }

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    isAuthenticated: authService.isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
