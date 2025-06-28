// import Autocomplete from "@/components/ui/auto-complete";
import { useState } from "react";
import Autocomplete from "../../../../../registry/ui/auto-complete";

export function BasicAutocompleteExample() {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
    { value: "elderberry", label: "Elderberry" },
    { value: "fig", label: "Fig" },
    { value: "grape", label: "Grape" },
    { value: "honeydew", label: "Honeydew" },
    { value: "kiwi", label: "Kiwi" },
    { value: "lemon", label: "Lemon" },
    { value: "mango", label: "Mango" },
    { value: "nectarine", label: "Nectarine" },
    { value: "orange", label: "Orange" },
    { value: "papaya", label: "Papaya" },
    { value: "quince", label: "Quince" },
    { value: "raspberry", label: "Raspberry" },
    { value: "strawberry", label: "Strawberry" },
    { value: "tangerine", label: "Tangerine" },
    { value: "ugli fruit", label: "Ugli Fruit" },
    { value: "watermelon", label: "Watermelon" },
  ];

  const handleSingleChange = (value: string | null) => {
    console.log('Single select changed to:', value);
    setSelectedValue(value);
  };

  return (
    <Autocomplete
      options={fruits}
      value={selectedValue}
      onChange={handleSingleChange}
      placeholder="Select a fruit..."
      clearable={true}
    />
  );
}
