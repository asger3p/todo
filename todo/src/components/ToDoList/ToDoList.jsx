import { useState } from "react";
import { Title, Wrapper } from "./Title";
import ToDoItem from "../ToDoItem/ToDoItem";
import ToDoListSC from "./ToDoListSC";
import AddRow from "../AddRow/AddRow";

export default function ToDoList({
  name,
  tasks,
  onRemoveListClick,
  onAddTask,
  onToggleTask,
  onRemoveTask,
}) {
  const [taskInput, setTaskInput] = useState("");

  return (
    <ToDoListSC>
      <Wrapper>
        <Title>{name}</Title>
        <button
          className="remove-list-button"
          onClick={onRemoveListClick}
          aria-label={`Remove list ${name}`}
        >
          x
        </button>
      </Wrapper>

      <ul>
        {tasks.map((task) => (
          <ToDoItem
            key={task.uuid}
            task={task}
            onToggleTask={() => onToggleTask(task.uuid)}
            onRemoveTask={() => onRemoveTask(task.uuid)}
          />
        ))}
      </ul>

      <AddRow
        placeholder="Enter task"
        value={taskInput}
        onChange={setTaskInput}
        onAdd={() => {
          onAddTask(taskInput);
          setTaskInput("");
        }}
      />
    </ToDoListSC>
  );
}
