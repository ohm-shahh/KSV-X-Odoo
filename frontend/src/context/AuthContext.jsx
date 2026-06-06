import { useState } from 'react';
import { AuthContext } from './authContextValue';

function getStoredUser() {
  const storedUser = localStorage.getItem('vb_user');
  const storedToken = localStorage.getItem('vb_token');

  if (!storedUser || !storedToken) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem('vb_user');
    localStorage.removeItem('vb_token');
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('vb_user', JSON.stringify(userData));
    localStorage.setItem('vb_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vb_user');
    localStorage.removeItem('vb_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}
