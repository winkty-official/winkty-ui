import { useState } from "react";
import Autocomplete, { Option } from "@/components/ui/auto-complete";

export function MultiSelectExample() {
  const [selectedCountries, setSelectedCountries] = useState<string[] | null>(
    null,
  );

  const countries: Option[] = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
  ];

  return (
    <Autocomplete
      options={countries}
      value={selectedCountries}
      onChange={(value) => {
        console.log("🚀 ~ MultiSelectExample ~ value:", value);
        setSelectedCountries(value);
      }}
      placeholder="Select multiple countries"
      multiSelect={true}
    />
  );
}
