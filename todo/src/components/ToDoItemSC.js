import styled from "styled-components";

const ToDoItemSC = styled.li`
  list-style: none;
  font-size: 1rem;
  font-weight: 400;
  margin: 0.5rem 0;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
`;

export default ToDoItemSC;
