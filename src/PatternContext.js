import React, { useState, createContext } from "react";

const PatternContext = createContext();

export const PatternContextProvider = ({ children }) => {
  const [patterns, setPatterns] = useState([]);
  return (
    <PatternContext.Provider value={{ patterns, setPatterns }}>
      {children}
    </PatternContext.Provider>
  );
};

export default PatternContext;
