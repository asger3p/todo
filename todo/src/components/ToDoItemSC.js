import styled from "styled-components";

const ToDoItemSC = styled.li`
  list-style: none;
  font-size: 1rem;
  font-weight: 400;
  margin: 0.3rem 0;
  padding: 0.5rem 0.8rem;
  border: 1px solid #3700ff;
  border-radius: 5px;
  background-color: ${(props) => (props.$completed ? "#083153" : "#0d4a7c")};
  color: ${(props) => (props.$completed ? "#7f8c8d" : "#ffffff")};
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};

  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  margin-left: auto;
  margin-right: auto;

  .task-text {
    flex: 1;
  }

  .checkbox {
    margin-left: 1rem;
    transform: scale(1.2);
    cursor: pointer;
  }

  button.remove-task-button {
    position: absolute;
    top: 2px;
    left: 2px;
    background: none;
    border: none;
    color: #696969ff;
    font-size: 0.7rem;
    cursor: pointer;
    padding: 2px 4px;
    line-height: 1;
  }
`;

export default ToDoItemSC;
