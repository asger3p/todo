import styled from "styled-components";

const ToDoListSC = styled.div`
  list-style: none;
  padding: 1rem;
  margin: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.listBackground};
  position: relative;
  box-shadow: 0 2px 6px #00000040;

  .remove-list-button {
    position: absolute;
    top: 4px;
    left: 4px;
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.buttonRemove};
    font-size: 0.7rem;
    cursor: pointer;
    padding: 2px 4px;
    line-height: 1;
  }

  ul {
    padding: 0;
    margin: 0 auto;
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
    max-height: 300px;
  }

  .add-row {
    margin-top: auto;
    padding-top: ${(props) => props.theme.spacing.small};
  }
`;

export default ToDoListSC;
