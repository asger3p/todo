import { useEffect, useState } from "react";
import { Title, Wrapper } from "./Title";
import uuid from "react-uuid";
import ToDoItem from "./ToDoItem";

export default function ToDoList({ id, name }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(id);
    return saved ? JSON.parse(saved) : { active: [], completed: [] };
  });

  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(tasks));
  }, [tasks, id]);

  function handleAddTaskClick() {
    if (!taskInput.trim()) return;
    setTasks({
      ...tasks,
      active: [
        ...tasks.active,
        { uuid: uuid(), text: taskInput, completed: false },
      ],
    });
    setTaskInput("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") handleAddTaskClick();
  }

  function handleInputChange(event) {
    setTaskInput(event.target.value);
  }

  function toggleTaskCompletion(task, fromCompleted = false) {
    if (fromCompleted) {
      setTasks({
        active: [...tasks.active, { ...task, completed: false }],
        completed: tasks.completed.filter((t) => t.uuid !== task.uuid),
      });
    } else {
      setTasks({
        active: tasks.active.filter((t) => t.uuid !== task.uuid),
        completed: [...tasks.completed, { ...task, completed: true }],
      });
    }
  }

  function removeTask(task, fromCompleted = false) {
    if (fromCompleted) {
      setTasks({
        ...tasks,
        completed: tasks.completed.filter((t) => t.uuid !== task.uuid),
      });
    } else {
      setTasks({
        ...tasks,
        active: tasks.active.filter((t) => t.uuid !== task.uuid),
      });
    }
  }

  return (
    <div className="todo-list">
      <Wrapper>
        <Title>{name}</Title>
        <p>Tasks: {tasks.active.length}</p>
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

      <h3>Completed</h3>
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
