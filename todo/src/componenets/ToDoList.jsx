import { useState } from "react";

export default function ToDoList({ name }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  function addTask() {
    setTasks([...tasks, taskInput]);
    setTaskInput("");
  }

  function removeTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function handleInputChange(event) {
    setTaskInput(event.target.value);
  }

  return (
    <>
      <h2>{name}</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => removeTask(index)}>X</button>
          </li>
        ))}
      </ul>
      <input type="text" value={taskInput} onChange={handleInputChange} />
      <button onClick={addTask}>Add Task</button>
    </>
  );
}
