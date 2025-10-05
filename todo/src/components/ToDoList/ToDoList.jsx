import { useState } from "react";
import { Title, Wrapper } from "./Title";
import uuid from "react-uuid";
import ToDoItem from "../ToDoItem/ToDoItem";
import ToDoListSC from "./ToDoListSC";
import { InputSC } from "../common/InputSC";
import { ButtonSC } from "../common/ButtonSC";

export default function ToDoList({
  name,
  tasks,
  onTasksChange,
  onRemoveListClick,
}) {
  const [taskInput, setTaskInput] = useState("");

  function handleAddTaskClick() {
    const newTasks = {
      ...tasks,
      active: [
        ...tasks.active,
        { uuid: uuid(), text: taskInput, completed: false },
      ],
    };
    onTasksChange(newTasks);
    setTaskInput("");
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

      <InputSC
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTaskClick()}
        placeholder="Enter task"
      />
      <ButtonSC onClick={handleAddTaskClick}>Add Task</ButtonSC>
    </ToDoListSC>
  );
}
