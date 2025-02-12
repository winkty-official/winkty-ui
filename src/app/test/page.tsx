"use client";

import Autocomplete, { Option } from "@/components/ui/auto-complete";
import { useState } from "react";

const TestPage = () => {
  const [value, setValue] = useState<Option | null>(null);
  return (
    <div className="max-w-lg mx-auto mt-40">
      <Autocomplete
        value={value}
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
          { value: "4", label: "Option 4" },
          { value: "5", label: "Option 5" },
        ]}
        placeholder="Select an option..."
        onChange={(value) => {
          setValue(value);
          console.log(value);
        }}
        any={true}
        multiSelect={false}
      />
    </div>
  );
};

export default TestPage;
