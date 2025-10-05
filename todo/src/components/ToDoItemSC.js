import styled from "styled-components";

const ToDoItemSC = styled.li`
  list-style: none;
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 400;
  margin: ${(props) => props.theme.spacing.small} 0;
  padding: 0.5rem 0.8rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) =>
    props.$completed
      ? props.theme.colors.completedTask
      : props.theme.colors.secondary};
  color: ${(props) =>
    props.$completed
      ? props.theme.colors.completedTaskText
      : props.theme.colors.text};
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
    margin-left: ${(props) => props.theme.spacing.medium};
    transform: scale(1.2);
    cursor: pointer;
  }

  button.remove-task-button {
    position: absolute;
    top: 2px;
    left: 2px;
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.buttonRemove};
    font-size: ${(props) => props.theme.fontSizes.small};
    cursor: pointer;
    padding: 2px 4px;
    line-height: 1;
  }
`;

export default ToDoItemSC;
