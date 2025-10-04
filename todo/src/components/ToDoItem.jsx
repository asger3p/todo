import ToDoItemSC from "./ToDoItemSC";

export default function ToDoItem({ task, onToggle, onRemove }) {
  return (
    <ToDoItemSC $completed={task.completed}>
      {task.text}
      <input type="checkbox" checked={task.completed} onChange={onToggle} />
      <button className="remove-task-button" onClick={onRemove}>
        x
      </button>
    </ToDoItemSC>
  );
}
