import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.small};
  margin: ${(props) => props.theme.spacing.medium} 0;
`;

export const Button = styled.button`
  font-family: "Material Symbols Outlined";
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
  font-size: ${(props) => props.theme.fontSizes.large};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHover};
  }
  transition: background-color 0.3s;
`;

export const Input = styled.input`
  font-family: ${(props) => props.theme.fonts.main};
  padding: 0.4rem 0.6rem;
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.borders.default};
  font-size: ${(props) => props.theme.fontSizes.medium};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.small};
  margin-top: ${(props) => props.theme.spacing.small};
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.borders.focused.split(" ")[2]};
  }
  &:hover {
    border-color: ${(props) => props.theme.borders.hover.split(" ")[2]};
  }
`;
