import React, { memo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeToggle as StyledThemeToggle } from "./styles/StyledComponents";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <StyledThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
      {isDarkMode ? "☀️" : "🌙"}
    </StyledThemeToggle>
  );
};

export default memo(ThemeToggle);
