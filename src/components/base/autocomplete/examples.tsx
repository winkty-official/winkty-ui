"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  CodeExamples,
  type CodeExample,
} from "@/components/docs/code-examples";
// import { AsyncAutocomplete } from "./async-autocomplete";
import { SearchableAutocomplete } from "./searchable-autocomplete";
import { MultiSelectAutocomplete } from "./multi-select-autocomplete";
import { useState } from "react";
import { Option } from "./types";
import { AsyncAutocomplete } from "./async-autocomplete";
import {
  AsyncAutocompleteExample,
  AutocompleteFormExample,
  BasicAutocompleteExample,
  CustomAutocompleteExample,
} from "./form.example";

// Mock API call
const mockFetchUsers = async (query: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = [
    { value: "1", label: "John Doe" },
    { value: "2", label: "Jane Smith" },
    { value: "3", label: "Bob Johnson" },
    { value: "4", label: "Alice Brown" },
  ];

  return users.filter((user) =>
    user.label.toLowerCase().includes(query.toLowerCase())
  );
};

// Static options for examples
const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

// Form component for the example
function FormExample() {
  const schema = z.object({
    user: z
      .object({
        value: z.string(),
        label: z.string(),
      })
      .nullable(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      user: null,
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => console.log(data))}
      className="w-full max-w-sm mx-auto space-y-4"
    >
      <Controller
        control={form.control}
        name="user"
        render={({ field, fieldState }) => (
          <AsyncAutocomplete
            loadOptions={mockFetchUsers}
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            error={fieldState.error?.message}
            placeholder="Select a user"
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

// Searchable Example
function SearchableExample() {
  const [value, setValue] = useState<Option | null>(null);

  const handleChange = (newValue: Option | Option[] | null) => {
    setValue(newValue as Option | null);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <SearchableAutocomplete
        options={countries}
        value={value}
        onChange={handleChange}
        placeholder="Select a country"
      />
    </div>
  );
}

// Multi-Select Example
function MultiSelectExample() {
  const [value, setValue] = useState<Option[]>([]);

  const handleChange = (newValue: Option | Option[] | null) => {
    setValue(newValue as Option[]);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <MultiSelectAutocomplete
        options={countries}
        value={value}
        onChange={handleChange}
        placeholder="Select countries"
      />
    </div>
  );
}

const usageExamples: CodeExample[] = [
  {
    title: "Async Autocomplete",
    description: "Asynchronous autocomplete with search functionality",
    preview: (
      <div className="space-y-10">
        <AsyncAutocompleteExample />
        <BasicAutocompleteExample />
        <CustomAutocompleteExample />
        <AutocompleteFormExample />
      </div>
    ),
    code: `import { AsyncAutocomplete } from "@/components/ui/async-autocomplete";
import { useState } from "react";
import { Option } from "./types";

export function AsyncAutocompleteDemo() {
  const [value, setValue] = useState<Option | null>(null);

  const loadOptions = async (query: string): Promise<Option[]> => {
    const response = await fetch(\`/api/search?q=\${query}\`);
    return response.json();
  };

  return (
    <AsyncAutocomplete
      loadOptions={loadOptions}
      value={value}
      onChange={setValue}
      placeholder="Search..."
    />
  );
}`,
  },
  {
    title: "Searchable Autocomplete",
    description: "Static options with search functionality",
    preview: <SearchableExample />,
    code: `import { SearchableAutocomplete } from "@/components/ui/searchable-autocomplete";

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
];

export function CountrySelect() {
  const [value, setValue] = useState(null);
  return (
    <SearchableAutocomplete
      options={countries}
      value={value}
      onChange={setValue}
      placeholder="Select a country"
    />
  );
}`,
  },
  {
    title: "Multi-Select Autocomplete",
    description: "Select multiple options with search",
    preview: <MultiSelectExample />,
    code: `import { MultiSelectAutocomplete } from "@/components/ui/multi-select-autocomplete";

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
];

export function CountryMultiSelect() {
  const [value, setValue] = useState([]);
  return (
    <MultiSelectAutocomplete
      options={countries}
      value={value}
      onChange={setValue}
      placeholder="Select countries"
    />
  );
}`,
  },
  {
    title: "Form Integration",
    description: "Using AsyncAutocomplete with React Hook Form",
    preview: <FormExample />,
    code: `import { AsyncAutocomplete } from "@/components/ui/async-autocomplete";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  user: z.object({
    value: z.string(),
    label: z.string(),
  }).nullable(),
});

export function UserForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      user: null,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
      <Controller
        control={form.control}
        name="user"
        render={({ field, fieldState }) => (
          <AsyncAutocomplete
            loadOptions={fetchUsers}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            placeholder="Select a user"
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}`,
  },
];

export default function AutoCompleteCodeExample() {
  return <CodeExamples examples={usageExamples} />;
}
