import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.fonts.main};
    background-color: ${(props) =>
      props.theme.colors.background}; /* Use your theme */
    color: ${(props) => props.theme.colors.text};
    min-height: 100vh; /* ensures full viewport height */
  }
`;
