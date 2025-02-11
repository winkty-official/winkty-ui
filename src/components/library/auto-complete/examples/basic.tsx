import { useState } from "react";
import Autocomplete from "..";

export function BasicAutocompleteExample() {
  const [selectedFruit, setSelectedFruit] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
    { value: "elderberry", label: "Elderberry" },
  ];

  return (
    <Autocomplete
      options={fruits}
      value={selectedFruit}
      onChange={(value) => setSelectedFruit(value)}
      placeholder="Select a fruit"
    />
  );
}
