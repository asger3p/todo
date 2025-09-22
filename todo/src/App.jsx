import "./App.css";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <ToDoList name="Doing" />
      <ToDoList name="Opportunities" />
      <ToDoList name="For a rainy day" />
    </>
  );
}

export default App;
