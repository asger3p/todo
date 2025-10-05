import "./App.css";
import Board from "./components/Board";
import { theme } from "./Theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Board />
    </ThemeProvider>
  );
}

export default App;
