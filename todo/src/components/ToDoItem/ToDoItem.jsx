import ToDoItemSC from "./ToDoItemSC";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ToDoItem({ id, task, onToggle, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
    boxShadow: isDragging ? "0 2px 8px rgba(0,0,0,0.2)" : undefined,
    cursor: "grab",
  };

  return (
    <ToDoItemSC ref={setNodeRef} style={style} $completed={task.completed}>
      <div {...attributes} {...listeners} style={{ flex: 1 }}>
        {task.text}
      </div>

      <input
        className="checkbox"
        type="checkbox"
        checked={task.completed}
        onClick={(e) => e.stopPropagation()}
        onChange={onToggle}
      />

      <button
        className="remove-task-button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        x
      </button>
    </ToDoItemSC>
  );
}
