import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  let api = axios.create({
    baseURL: "http://localhost:8000/",
    headers: { "Content-Type": "application/json" },
  });

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
