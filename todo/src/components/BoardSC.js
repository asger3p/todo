import styled from "styled-components";

export const BoardContainer = styled.div`
  padding: 1rem;
`;

export const ListsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;
