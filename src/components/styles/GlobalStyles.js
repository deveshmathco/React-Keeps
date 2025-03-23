import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  background: "#f8f9fa",
  cardBackground: "#ffffff",
  text: "#212529",
  primary: "#0d6efd",
  secondary: "#6c757d",
  success: "#198754",
  danger: "#dc3545",
  warning: "#ffc107",
  info: "#0dcaf0",
  border: "#dee2e6",
  shadow: "rgba(0, 0, 0, 0.1)",
  taskCompleted: "#e9ecef",
  taskCompletedText: "#6c757d",
  taskHigh: "#ffebee",
  taskMedium: "#e3f2fd",
  taskLow: "#f1f8e9",
  taskPastDue: "#ffebee",
};

export const darkTheme = {
  background: "#212529",
  cardBackground: "#343a40",
  text: "#f8f9fa",
  primary: "#0d6efd",
  secondary: "#adb5bd",
  success: "#20c997",
  danger: "#dc3545",
  warning: "#ffc107",
  info: "#0dcaf0",
  border: "#495057",
  shadow: "rgba(0, 0, 0, 0.4)",
  taskCompleted: "#2b3035",
  taskCompletedText: "#adb5bd",
  taskHigh: "#4a312f",
  taskMedium: "#2e3c50",
  taskLow: "#324035",
  taskPastDue: "#4a312f",
};

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Segoe UI', 'Roboto', sans-serif;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.primary};
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin-bottom: 0.5em;
  }

  p {
    margin-bottom: 1rem;
  }

  @media (max-width: 576px) {
    html {
      font-size: 14px;
    }
  }
`;

export default GlobalStyles;
