import { useEffect, useState } from "react";
import uuid from "react-uuid";
import ToDoList from "./ToDoList";
import { BoardContainer, ListsContainer } from "./BoardSC";

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
    const newLists = [...lists, { id: uuid(), name: listInput, tasks: [] }];
    setLists(newLists);
    setListInput("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAddListClick();
    }
  }

  function handleInputChange(event) {
    setListInput(event.target.value);
  }

  function handleTasksChange(listId, newTasks) {
    setLists((prevLists) =>
      prevLists.map((l) => (l.id === listId ? { ...l, tasks: newTasks } : l))
    );
  }

  function handleRemoveListClick(listId) {
    setLists((prevLists) => prevLists.filter((l) => l.id !== listId));
    localStorage.removeItem(listId);
  }

  return (
    <BoardContainer>
      <input
        type="text"
        value={listInput}
        placeholder="New list name"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <br />
      <button onClick={handleAddListClick}>Add List</button>

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
