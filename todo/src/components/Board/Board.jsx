import { useState, useEffect } from "react";
import uuid from "react-uuid";
import ToDoList from "../ToDoList/ToDoList";
import { AddListSection, BoardContainer, ListsContainer } from "./BoardSC";
import AddRow from "../AddRow/AddRow";

export default function Board() {
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("board");
    return saved ? JSON.parse(saved) : [];
  });
  const [listInput, setListInput] = useState("");

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(lists));
  }, [lists]);

  function handleAddListClick(listInput) {
    if (!listInput.trim()) return;
    setLists([...lists, { id: uuid(), name: listInput, tasks: [] }]);
  }

  function handleRemoveListClick(listId) {
    setLists((prev) => prev.filter((l) => l.id !== listId));
  }

  function handleTasksChange(listId, newTasks) {
    setLists((prev) =>
      prev.map((l) => (l.id === listId ? { ...l, tasks: newTasks } : l))
    );
  }

  function handleAddTaskClick(listId, taskText) {
    if (!taskText.trim()) return;
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                { uuid: uuid(), text: taskText, completed: false },
              ],
            }
          : list
      )
    );
  }

  function handleToggleTaskCompletion(listId, taskId) {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((t) =>
                t.uuid === taskId ? { ...t, completed: !t.completed } : t
              ),
            }
          : list
      )
    );
  }

  function handleRemoveTask(listId, taskId) {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((t) => t.uuid !== taskId),
            }
          : list
      )
    );
  }

  return (
    <BoardContainer>
      <AddListSection>
        <AddRow
          placeholder="New list name"
          value={listInput}
          onChange={setListInput}
          onAdd={() => {
            handleAddListClick(listInput);
            setListInput("");
          }}
        />
      </AddListSection>
      <ListsContainer>
        {lists.map((list) => (
          <ToDoList
            key={list.id}
            id={list.id}
            name={list.name}
            tasks={list.tasks}
            onAdd={(taskText) => handleAddTaskClick(list.id, taskText)}
            onToggle={(taskId) => handleToggleTaskCompletion(list.id, taskId)}
            onRemove={(taskId) => handleRemoveTask(list.id, taskId)}
            onTasksChange={(newTasks) => handleTasksChange(list.id, newTasks)}
            onRemoveListClick={() => handleRemoveListClick(list.id)}
          />
        ))}
      </ListsContainer>
    </BoardContainer>
  );
}
