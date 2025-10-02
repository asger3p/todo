import { useEffect, useState } from "react";
import { Title, Wrapper } from "./Title";
import ToDoItemSC from "./ToDoItemSC";

export default function ToDoList({ name }) {
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    var savedTasks = localStorage.getItem(name);
    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
    }
  }, [name]);

  useEffect(() => {
    setTaskCount(taskList.length);
  }, [taskList]);

  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem(name, JSON.stringify(taskList));
    }
  }, [taskList, name]);

  function handleAddTaskClick() {
    var newList = [...taskList, { text: taskInput, completed: false }];
    setTaskList(newList);
    setTaskInput("");
  }

  function handleRemoveClick(index) {
    var newList = taskList.filter((_, i) => i !== index);
    setTaskList(newList);
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
    var newList = taskList.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTaskList(newList);
  }

  return (
    <div className="todo-list">
      <Wrapper>
        <Title>{name}</Title>
      </Wrapper>
      <p>Tasks: {taskCount}</p>
      <ul>
        {taskList.map((task, index) => (
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
