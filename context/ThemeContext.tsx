"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext =
  createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("darkMode");

    if (savedTheme === "true") {

      setDarkMode(true);

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode.toString()
    );

  }, [darkMode]);

  const toggleDarkMode = () => {

    setDarkMode(!darkMode);

  };

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

}

export function useTheme() {

  const context =
    useContext(ThemeContext);

  if (!context) {

    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );

  }

  return context;

}