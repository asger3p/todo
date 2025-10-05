import styled from "styled-components";

export const ButtonSC = styled.button`
  font-family: "Material Symbols Outlined";
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
  font-size: ${(props) => props.theme.fontSizes.large};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
`;
