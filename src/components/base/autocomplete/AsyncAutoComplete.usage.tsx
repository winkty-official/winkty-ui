"use client";

import { useState } from "react";
import { AsyncAutocomplete } from "./async-autocomplete";
import { Option } from "./types";

export default function AsyncAutocompleteUsage() {
  const [value, setValue] = useState<Option | null>(null);

  const loadOptions = async (query: string): Promise<Option[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return empty array if no query
    if (!query) return [];

    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ].filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );

    return options;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <AsyncAutocomplete
        loadOptions={loadOptions}
        value={value}
        onChange={(newValue) => setValue(newValue as Option | null)}
        placeholder="Search for options..."
      />
    </div>
  );
}
