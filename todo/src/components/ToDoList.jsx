import { useState } from "react";
import { Title, Wrapper } from "./Title";
import ToDoItemSC from "./ToDoItemSC";

export default function ToDoList({ name }) {
  const data = localStorage.getItem(name);

  const [tasks, setTasks] = useState(data ? JSON.parse(data) : []);
  const [taskInput, setTaskInput] = useState("");

  function handleAddTaskClick() {
    var newList = [...tasks, { text: taskInput, completed: false }];
    setTasks(newList);
    saveTasksToLocalStorage(newList);
    setTaskInput("");
  }

  function handleRemoveClick(index) {
    var newList = tasks.filter((_, i) => i !== index);
    setTasks(newList);
    saveTasksToLocalStorage(newList);
  }

  function saveTasksToLocalStorage(newList) {
    localStorage.setItem(name, JSON.stringify(newList));
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAddTaskClick();
    }
  }

  function handleInputChange(event) {
    setTaskInput(event.target.value);
  }

  function toggleTaskCompletion(index) {
    var newList = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newList);
    saveTasksToLocalStorage(newList);
  }

  return (
    <div className="todo-list">
      <Wrapper>
        <Title>{name}</Title>
      </Wrapper>
      <ul>
        {tasks.map((task, index) => (
          <ToDoItemSC key={index} completed={task.completed}>
            {task.text}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <button
              className="remove-task-button"
              onClick={() => handleRemoveClick(index)}
            >
              x
            </button>
          </ToDoItemSC>
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
      <button onClick={handleAddTaskClick}>Add Task</button>
    </div>
  );
}
