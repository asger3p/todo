import styled from "styled-components";

export const InputSC = styled.input`
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
`;
