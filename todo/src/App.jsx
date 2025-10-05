import Board from "./components/Board/Board";
import { theme } from "./theme/Theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./theme/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Board />
    </ThemeProvider>
  );
}

export default App;
