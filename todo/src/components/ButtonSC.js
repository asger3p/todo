import styled from "styled-components";

export const ButtonSC = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
`;
