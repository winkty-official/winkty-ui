import countries from "./allCountries.json";

export async function searchCountries(
  query: string
): Promise<{ label: string; value: string }[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (!query) {
    return countries.slice(0, 10);
  }

  // Filter countries based on the query
  return countries
    .filter((country) =>
      country.label.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 10);
}
