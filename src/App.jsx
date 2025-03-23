import React from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { TaskProvider } from "./contexts/TaskContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyles, {
  lightTheme,
  darkTheme,
} from "./components/styles/GlobalStyles";
import PageRouter from "./components/PageRouter";

const AppContent = () => {
  const { isDarkMode } = useTheme();

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <TaskProvider>
        <PageRouter />
      </TaskProvider>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
