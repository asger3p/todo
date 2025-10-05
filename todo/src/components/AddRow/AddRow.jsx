import React, { useState } from "react";
import { Row, Input, Button } from "./AddRowSC";

export default function AddRow({ placeholder, onAdd }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <Row>
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleAdd}>add_circle</Button>
    </Row>
  );
}
