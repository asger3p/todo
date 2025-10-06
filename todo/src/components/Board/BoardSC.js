import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  min-height: 100vh;
`;

export const AddListSection = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const ListsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  justify-items: center;
  padding: 2rem;
  border-radius: ${(props) => props.theme.borderRadius};
  width: 95%;
  max-width: 1200px;
  background-color: ${(props) => props.theme.colors.boardBackground};
`;
