import { useState } from "react";
import { Title, Wrapper } from "./Title";
import uuid from "react-uuid";
import ToDoItem from "../ToDoItem/ToDoItem";
import ToDoListSC from "./ToDoListSC";
import AddRow from "../AddRow/AddRow";

export default function ToDoList({
  name,
  tasks,
  onTasksChange,
  onRemoveListClick,
}) {
  const [taskInput, setTaskInput] = useState("");

  function handleAddTaskClick(taskText) {
    if (!taskText.trim()) return;
    const newTasks = [
      ...tasks,
      { uuid: uuid(), text: taskText, completed: false },
    ];
    onTasksChange(newTasks);
  }

  function toggleTaskCompletion(task) {
    const newTasks = tasks.map((t) =>
      t.uuid === task.uuid ? { ...t, completed: !t.completed } : t
    );
    onTasksChange(newTasks);
  }

  function removeTask(task) {
    const newTasks = tasks.filter((t) => t.uuid !== task.uuid);
    onTasksChange(newTasks);
  }

  return (
    <ToDoListSC>
      <Wrapper>
        <Title>{name}</Title>
        <button className="remove-list-button" onClick={onRemoveListClick}>
          x
        </button>
      </Wrapper>

      <ul>
        {tasks.map((task) => (
          <ToDoItem
            key={task.uuid}
            task={task}
            onToggle={() => toggleTaskCompletion(task)}
            onRemove={() => removeTask(task)}
          />
        ))}
      </ul>

      <AddRow
        placeholder="Enter task"
        value={taskInput}
        onChange={setTaskInput}
        onAdd={() => {
          handleAddTaskClick(taskInput);
          setTaskInput("");
        }}
      />
    </ToDoListSC>
  );
}
