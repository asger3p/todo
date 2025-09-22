import { useState } from "react";
import { Title, Wrapper } from "./Title";

export default function ToDoList({ name }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  function addTask() {
    setTasks([...tasks, { text: taskInput, completed: false }]);
    setTaskInput("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function removeTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function handleInputChange(event) {
    setTaskInput(event.target.value);
  }

  function toggleTaskCompletion(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="todo-list">
      <Wrapper>
        <Title>{name}</Title>
      </Wrapper>
      <ul>
        {tasks.map((task, index) => (
          <li
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
            key={index}
          >
            {task.text}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <button
              className="remove-task-button"
              onClick={() => removeTask(index)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={taskInput}
        placeholder="Enter task"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <br />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}
