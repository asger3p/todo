import "./App.css";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <ToDoList name="Doing" />
      <ToDoList name="Opportunities" />
      <ToDoList name="Completed" />
    </>
  );
}

export default App;
