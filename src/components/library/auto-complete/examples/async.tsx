import { searchCountries } from "@/components/library/auto-complete/data/api";
import Autocomplete, { Option } from "..";
import { useState } from "react";

export function AsyncAutocompleteExample() {
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Async Autocomplete</h2>
      <Autocomplete
        loadOptions={searchCountries}
        value={selectedCountry}
        onChange={
          setSelectedCountry as (value: Option | Option[] | null) => void
        }
        placeholder="Search for a country..."
      />
      <p>Selected country: {selectedCountry?.label ?? "None"}</p>
    </div>
  );
}
