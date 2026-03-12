import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = (userToken, userData = null) => {
    setToken(userToken);
    setUser(userData || { token: userToken });
  };

  const signUp = (userToken, userData) => {
    setToken(userToken);
    setUser(userData);
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
