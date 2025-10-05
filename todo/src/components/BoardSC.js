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

  input {
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    border: 1px solid #ff7700;
    background: #1b262c;
    color: white;
  }

  button {
    background-color: #ff7700;
    color: #fff;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const ListsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  justify-items: center;
  width: 100%;
  max-width: 1200px;
`;
