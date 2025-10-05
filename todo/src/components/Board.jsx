import { useState, useEffect } from "react";
import uuid from "react-uuid";
import ToDoList from "./ToDoList";
import { AddListSection, BoardContainer, ListsContainer } from "./BoardSC";

export default function Board() {
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("board");
    return saved ? JSON.parse(saved) : [];
  });
  const [listInput, setListInput] = useState("");

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(lists));
  }, [lists]);

  function handleAddListClick() {
    if (!listInput.trim()) return;
    setLists([
      ...lists,
      { id: uuid(), name: listInput, tasks: { active: [], completed: [] } },
    ]);
    setListInput("");
  }

  function handleRemoveListClick(listId) {
    setLists((prev) => prev.filter((l) => l.id !== listId));
  }

  function handleTasksChange(listId, newTasks) {
    setLists((prev) =>
      prev.map((l) => (l.id === listId ? { ...l, tasks: newTasks } : l))
    );
  }

  return (
    <BoardContainer>
      <AddListSection>
        <input
          type="text"
          value={listInput}
          placeholder="New list name"
          onChange={(e) => setListInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddListClick()}
        />
        <button onClick={handleAddListClick}>Add List</button>
      </AddListSection>

      <ListsContainer>
        {lists.map((list) => (
          <ToDoList
            key={list.id}
            id={list.id}
            name={list.name}
            tasks={list.tasks}
            onTasksChange={(newTasks) => handleTasksChange(list.id, newTasks)}
            onRemoveListClick={() => handleRemoveListClick(list.id)}
          />
        ))}
      </ListsContainer>
    </BoardContainer>
  );
}
