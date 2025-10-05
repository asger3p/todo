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
    const newTasks = {
      ...tasks,
      active: [
        ...tasks.active,
        { uuid: uuid(), text: taskText, completed: false },
      ],
    };
    onTasksChange(newTasks);
  }

  function toggleTaskCompletion(task, fromCompleted = false) {
    const newTasks = fromCompleted
      ? {
          active: [...tasks.active, { ...task, completed: false }],
          completed: tasks.completed.filter((t) => t.uuid !== task.uuid),
        }
      : {
          active: tasks.active.filter((t) => t.uuid !== task.uuid),
          completed: [...tasks.completed, { ...task, completed: true }],
        };
    onTasksChange(newTasks);
  }

  function removeTask(task, fromCompleted = false) {
    const newTasks = fromCompleted
      ? {
          ...tasks,
          completed: tasks.completed.filter((t) => t.uuid !== task.uuid),
        }
      : { ...tasks, active: tasks.active.filter((t) => t.uuid !== task.uuid) };
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
        {tasks.active.map((task) => (
          <ToDoItem
            key={task.uuid}
            task={task}
            onToggle={() => toggleTaskCompletion(task)}
            onRemove={() => removeTask(task)}
          />
        ))}
      </ul>

      <ul>
        {tasks.completed.map((task) => (
          <ToDoItem
            key={task.uuid}
            task={task}
            onToggle={() => toggleTaskCompletion(task, true)}
            onRemove={() => removeTask(task, true)}
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
