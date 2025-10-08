import { useState, useEffect } from "react";
import uuid from "react-uuid";
import { createPortal } from "react-dom";
import ToDoItem from "../ToDoItem/ToDoItem";
import ToDoList from "../ToDoList/ToDoList";
import { AddListSection, BoardContainer, ListsContainer } from "./BoardSC";
import AddRow from "../AddRow/AddRow";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

export default function Board() {
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("board");
    return saved ? JSON.parse(saved) : [];
  });
  const [listInput, setListInput] = useState("");
  const [activeTask, setActiveTask] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

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

  function handleDragStart(event) {
    const { active } = event;
    const task = lists
      .flatMap((l) => l.tasks)
      .find((t) => t.uuid === active.id);
    setActiveTask(task || null);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // --- Reordering whole lists ---
    const activeListIndex = lists.findIndex((l) => l.id === activeId);
    const overListIndex = lists.findIndex((l) => l.id === overId);

    if (activeListIndex !== -1 && overListIndex !== -1) {
      if (activeListIndex !== overListIndex) {
        setLists((prev) => arrayMove(prev, activeListIndex, overListIndex));
      }
      return;
    }

    // --- Reordering or moving tasks ---
    const sourceList = lists.find((l) =>
      l.tasks.some((t) => t.uuid === activeId)
    );
    const targetList = lists.find((l) =>
      l.tasks.some((t) => t.uuid === overId)
    );

    if (!sourceList || !targetList) return;

    const activeTaskIndex = sourceList.tasks.findIndex(
      (t) => t.uuid === activeId
    );
    const overTaskIndex = targetList.tasks.findIndex((t) => t.uuid === overId);

    // Same list reorder
    if (sourceList.id === targetList.id) {
      if (activeTaskIndex === overTaskIndex) return;
      const reordered = arrayMove(
        sourceList.tasks,
        activeTaskIndex,
        overTaskIndex
      );

      setLists((prev) =>
        prev.map((l) =>
          l.id === sourceList.id ? { ...l, tasks: reordered } : l
        )
      );
      return;
    }

    // Moving task to another list
    const movedTask = sourceList.tasks[activeTaskIndex];
    setLists((prev) =>
      prev.map((l) => {
        if (l.id === sourceList.id) {
          return {
            ...l,
            tasks: l.tasks.filter((t) => t.uuid !== activeId),
          };
        }
        if (l.id === targetList.id) {
          const newTasks = [...l.tasks];
          newTasks.splice(overTaskIndex + 1, 0, movedTask);
          return { ...l, tasks: newTasks };
        }
        return l;
      })
    );
    setActiveTask(null);
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext
          items={lists.map((l) => l.id)}
          strategy={rectSortingStrategy}
        >
          <ListsContainer>
            {lists.map((list) => (
              <ToDoList
                key={list.id}
                id={list.id}
                name={list.name}
                tasks={list.tasks}
                onAdd={(taskText) => handleAddTaskClick(list.id, taskText)}
                onToggle={(taskId) =>
                  handleToggleTaskCompletion(list.id, taskId)
                }
                onRemove={(taskId) => handleRemoveTask(list.id, taskId)}
                onTasksChange={(newTasks) =>
                  handleTasksChange(list.id, newTasks)
                }
                onRemoveListClick={() => handleRemoveListClick(list.id)}
              />
            ))}
          </ListsContainer>
          {createPortal(
            <DragOverlay>
              {activeTask ? (
                <ToDoItem
                  task={activeTask}
                  onToggle={() => {}}
                  onRemove={() => {}}
                />
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </SortableContext>
      </DndContext>
    </BoardContainer>
  );
}
