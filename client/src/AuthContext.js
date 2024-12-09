import React, { createContext, useState, useContext } from "react";

// Create the AuthContext to provide user authentication data globally
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext); // Custom hook to use the context
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null; // Retrieve user data from sessionStorage
  });

  const login = (userData) => {
    setUser(userData); // Update user state
    sessionStorage.setItem("user", JSON.stringify(userData)); // Save user data to sessionStorage
  };

  const logout = () => {
    setUser(null); // Remove user state
    sessionStorage.removeItem("user"); // Clear user data from sessionStorage
    sessionStorage.removeItem("token"); // Clear JWT
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
