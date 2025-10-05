import { Row, Input, Button } from "./AddRowSC";

export default function AddRow({ value, onChange, onAdd, placeholder }) {
  return (
    <Row>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        placeholder={placeholder}
      />
      <Button onClick={onAdd}>add_circle</Button>
    </Row>
  );
}
