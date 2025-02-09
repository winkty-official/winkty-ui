"use client";

import { useState } from "react";
import AutoComplete, { Option } from "@/components/library/auto-complete";

// Simulated async data fetching function
const fetchOptions = async (inputValue: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
          { value: "date", label: "Date" },
          { value: "elderberry", label: "Elderberry" },
          { value: "fig", label: "Fig" },
          { value: "grape", label: "Grape" },
        ].filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }, 1000); // Simulate network delay
  });
};

export default function AsyncAutocompleteExample() {
  const [selectedValue, setSelectedValue] = useState<Option[] | null>(null);

  return (
    <div className="w-64">
      <AutoComplete
        loadOptions={fetchOptions}
        value={selectedValue}
        onChange={setSelectedValue}
        placeholder="Search for a fruit..."
        multiSelect
      />
      {selectedValue && (
        <p className="mt-2">Selected: {selectedValue?.map((t) => t?.label)}</p>
      )}
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import { NormalAutocomplete, Option } from "@/components/library/auto-complete";

// const options: Option[] = [
//   { value: "apple", label: "Apple" },
//   { value: "banana", label: "Banana" },
//   { value: "cherry", label: "Cherry" },
//   { value: "date", label: "Date" },
// ];

// export default function AutocompleteExample() {
//   const [selectedSingle, setSelectedSingle] = useState<Option | null>(null);
//   const [selectedMulti, setSelectedMulti] = useState<Option[]>([]);

//   return (
//     <div className="space-y-6 p-6">
//       <h2 className="text-xl font-semibold">Single Select</h2>
//       <NormalAutocomplete
//         value={selectedSingle}
//         onChange={setSelectedSingle}
//         options={options}
//         placeholder="Select a fruit"
//         clearable
//       />

//       <h2 className="text-xl font-semibold">Multi Select</h2>
//       <NormalAutocomplete
//         multiSelect
//         value={selectedMulti}
//         onChange={setSelectedMulti}
//         options={options}
//         placeholder="Select multiple fruits"
//         clearable
//       />
//     </div>
//   );
// }
