import styled from "styled-components";

export const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.large};
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`;

export const Wrapper = styled.section`
  padding: 0.1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.colors.primary};
`;
