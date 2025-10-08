import { useState } from "react";
import { Title, Wrapper } from "./Title";
import ToDoItem from "../ToDoItem/ToDoItem";
import ToDoListSC from "./ToDoListSC";
import AddRow from "../AddRow/AddRow";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function ToDoList({
  id,
  name,
  tasks,
  onRemoveListClick,
  onAdd,
  onToggle,
  onRemove,
}) {
  const [taskInput, setTaskInput] = useState("");
  const { attributes, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ToDoListSC ref={setNodeRef} style={style} {...attributes}>
      <Wrapper>
        <Title>{name}</Title>
        <button className="remove-list-button" onClick={onRemoveListClick}>
          x
        </button>
      </Wrapper>

      <ul>
        <SortableContext
          items={tasks.map((t) => t.uuid)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <ToDoItem
              key={task.uuid}
              id={task.uuid}
              task={task}
              onToggle={() => onToggle(task.uuid)}
              onRemove={() => onRemove(task.uuid)}
            />
          ))}
        </SortableContext>
      </ul>

      <AddRow
        placeholder="Enter task"
        value={taskInput}
        onChange={setTaskInput}
        onAdd={() => {
          onAdd(taskInput);
          setTaskInput("");
        }}
      />
    </ToDoListSC>
  );
}
