import styled from "styled-components";

const ToDoListSC = styled.div`
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.listBackground};
  position: relative;

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
  }
`;

export default ToDoListSC;
