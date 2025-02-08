import { Option } from "@/components/base/autocomplete/normal-autocomplete";

// Simulated database of countries
const countries: Option[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "it", label: "Italy" },
];

export async function searchCountries(query: string): Promise<Option[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Filter countries based on the query
  return countries.filter((country) =>
    country.label.toLowerCase().includes(query.toLowerCase())
  );
}
