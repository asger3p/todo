import { useState } from "react";

export default function ToDoList({ name }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  function addTask() {
    setTasks([...tasks, taskInput]);
    setTaskInput("");
  }

  function handleInputChange(event) {
    setTaskInput(event.target.value);
  }

  return (
    <>
      <h2>{name}</h2>
      <ul>
        {tasks.map((task) => (
          <li>{task}</li>
        ))}
      </ul>
      <input type="text" value={taskInput} onChange={handleInputChange} />
      <button onClick={addTask}>Add Task</button>
    </>
  );
}
