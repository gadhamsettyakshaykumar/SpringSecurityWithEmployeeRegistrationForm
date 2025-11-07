import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  const login = async (username, password) => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const jwt = data.token;
    setToken(jwt);
    setUsername(username);
    localStorage.setItem("token", jwt);
    localStorage.setItem("username", username);
  };

  const logout = async () => {
    if (token) {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setToken(null);
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
