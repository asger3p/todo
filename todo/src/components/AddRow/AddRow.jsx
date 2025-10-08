import { Row, Input, Button } from "./AddRowSC";

export default function AddRow({ value, onChange, onAddTask, placeholder }) {
  return (
    <Row>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAddTask()}
        placeholder={placeholder}
      />
      <Button onClick={onAddTask}>add_circle</Button>
    </Row>
  );
}
