"use client";

import {
  CodeExamples,
  type CodeExample,
} from "@/components/docs/code-examples";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
// import { AsyncAutocomplete } from "./async-autocomplete";
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

const usageExamples: CodeExample[] = [
  {
    title: "Asynchronous Search",
    description:
      "Fetch and display search results as you type with built-in debouncing and loading states",
    preview: <AsyncAutocompleteExample />,
    code: `import { AsyncAutocomplete } from "@/components/ui/async-autocomplete";
import { useState } from "react";

type User = { value: string; label: string };

export function UserSearch() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const searchUsers = async (query: string): Promise<User[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = [
      { value: "1", label: "John Doe" },
      { value: "2", label: "Jane Smith" },
      { value: "3", label: "Bob Johnson" }
    ];
    return users.filter(user => 
      user.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <AsyncAutocomplete
      loadOptions={searchUsers}
      value={selectedUser}
      onChange={setSelectedUser}
      placeholder="Search users..."
    />
  );
}`,
  },
  {
    title: "Basic Search",
    description:
      "Simple searchable dropdown with static options and keyboard navigation",
    preview: <BasicAutocompleteExample />,
    code: `import { SearchableAutocomplete } from "@/components/ui/searchable-autocomplete";
import { useState } from "react";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" }
];

export function FruitSelect() {
  const [selected, setSelected] = useState(null);

  return (
    <SearchableAutocomplete
      options={fruits}
      value={selected}
      onChange={setSelected}
      placeholder="Select a fruit"
    />
  );
}`,
  },
  {
    title: "Custom Rendering",
    description:
      "Customize the appearance of options with custom rendering functions",
    preview: <CustomAutocompleteExample />,
    code: `import { SearchableAutocomplete } from "@/components/ui/searchable-autocomplete";
import { useState } from "react";

const users = [
  { value: "1", label: "John Doe", role: "Admin", avatar: "/avatars/john.png" },
  { value: "2", label: "Jane Smith", role: "User", avatar: "/avatars/jane.png" }
];

export function CustomUserSelect() {
  const [selected, setSelected] = useState(null);

  return (
    <SearchableAutocomplete
      options={users}
      value={selected}
      onChange={setSelected}
      placeholder="Select a user"
      renderOption={(option) => (
        <div className="flex items-center gap-2">
          <img src={option.avatar} className="w-6 h-6 rounded-full" />
          <div>
            <div>{option.label}</div>
            <div className="text-sm text-gray-500">{option.role}</div>
          </div>
        </div>
      )}
    />
  );
}`,
  },
  {
    title: "Multi-Select Autocomplete",
    description: "Select multiple options with search",
    preview: <AutocompleteFormExample />,
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
