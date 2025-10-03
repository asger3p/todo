import { useEffect, useState } from "react";
import { Title, Wrapper } from "./Title";
import uuid from "react-uuid";
import ToDoItem from "./ToDoItem";

export default function ToDoList({ name }) {
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    var savedTasks = localStorage.getItem(name);
    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
    }
  }, [name]);

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(taskList));
  }, [taskList, name]);

  function handleAddTaskClick() {
    var newList = [
      ...taskList,
      { uuid: uuid(), text: taskInput, completed: false },
    ];
    setTaskList(newList);
    setTaskInput("");
  }

  function handleRemoveClick(index) {
    var newList = taskList.filter((task) => task.uuid !== taskList[index].uuid);
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
        <p>Tasks: {taskList.length}</p>
      </Wrapper>

      <ul>
        {taskList.map((task, index) => (
          <ToDoItem
            key={task.uuid}
            task={task}
            onToggle={() => toggleTaskCompletion(index)}
            onRemove={() => handleRemoveClick(index)}
          />
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
