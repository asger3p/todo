import ToDoItemSC from "./ToDoItemSC";

export default function ToDoItem({ task, onToggleTask, onRemove }) {
  return (
    <ToDoItemSC $completed={task.completed}>
      {task.text}
      <input
        className="checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={onToggleTask}
      />
      <button className="remove-task-button" onClick={onRemove}>
        x
      </button>
    </ToDoItemSC>
  );
}
