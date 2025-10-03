import { useEffect, useState } from "react";
import { Title, Wrapper } from "./Title";
import uuid from "react-uuid";
import ToDoItem from "./ToDoItem";

export default function ToDoList({ name }) {
  const [taskList, setTaskList] = useState([]);
  const [completedTasksList, setCompletedTasksList] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(name);
    if (saved) {
      const { active = [], completed = [] } = JSON.parse(saved);
      setTaskList(active);
      setCompletedTasksList(completed);
    }
  }, [name]);

  useEffect(() => {
    localStorage.setItem(
      name,
      JSON.stringify({ active: taskList, completed: completedTasksList })
    );
  }, [taskList, completedTasksList, name]);

  function handleAddTaskClick() {
    var newList = [
      ...taskList,
      { uuid: uuid(), text: taskInput, completed: false },
    ];
    setTaskList(newList);
    setTaskInput("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAddTaskClick();
    }
  }

  function handleInputChange(event) {
    setTaskInput(event.target.value);
  }

  function toggleTaskCompletion(task, fromCompleted = false) {
    if (fromCompleted) {
      setCompletedTasksList(
        completedTasksList.filter((t) => t.uuid !== task.uuid)
      );
      setTaskList([...taskList, { ...task, completed: false }]);
    } else {
      setTaskList(taskList.filter((t) => t.uuid !== task.uuid));
      setCompletedTasksList([
        ...completedTasksList,
        { ...task, completed: true },
      ]);
    }
  }

  return (
    <div className="todo-list">
      <Wrapper>
        <Title>{name}</Title>
        <p>Tasks: {taskList.length}</p>
      </Wrapper>

      <ul>
        {taskList.map((task) => (
          <ToDoItem
            key={task.uuid}
            task={task}
            onToggle={() => toggleTaskCompletion(task)}
            onRemove={() =>
              setTaskList(taskList.filter((t) => t.uuid !== task.uuid))
            }
          />
        ))}
      </ul>

      <h3>Completed</h3>
      <ul>
        {completedTasksList.map((task) => (
          <ToDoItem
            key={task.uuid}
            task={task}
            onToggle={() => toggleTaskCompletion(task, true)}
            onRemove={() =>
              setCompletedTasksList(
                completedTasksList.filter((t) => t.uuid !== task.uuid)
              )
            }
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
