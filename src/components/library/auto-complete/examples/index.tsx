"use client";
import {
  CodeExamples,
  type CodeExample,
} from "@/components/docs/code-examples";
import { AsyncAutocompleteExample } from "./async";
import { BasicAutocompleteExample } from "./basic";
import { CustomAutocompleteExample } from "./custom";
import { MultiSelectExample } from "./multiselect";
import { AutoCompleteFormExample } from "./form";
import { SkillsInputExample } from "./any";

const usageExamples: CodeExample[] = [
  {
    title: "Asynchronous Search",
    description:
      "Fetch and display search results as you type with built-in debouncing and loading states",
    preview: <AsyncAutocompleteExample />,
    code: `"use client";
import Autocomplete, { Option } from "@/components/ui/autocomplete";
import { useState } from "react";

const countries = [
  {
    label: "Afghanistan",
    value: "Afghanistan",
  },
  {
    label: "Albania",
    value: "Albania",
  },
  {
    label: "Algeria",
    value: "Algeria",
  },
  {
    label: "Andorra",
    value: "Andorra",
  },
  {
    label: "Angola",
    value: "Angola",
  },
];

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

async function searchCountries(
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
}`,
  },
  {
    title: "Basic Search",
    description:
      "Simple searchable dropdown with static options and keyboard navigation",
    preview: <BasicAutocompleteExample />,
    code: `"use client";
import { useState } from "react";
import Autocomplete from "@/components/ui/autocomplete";

export function BasicAutocompleteExample() {
  const [selectedFruit, setSelectedFruit] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
    { value: "elderberry", label: "Elderberry" },
  ];

  return (
    <Autocomplete
      options={fruits}
      value={selectedFruit}
      onChange={(value) => setSelectedFruit(value)}
      placeholder="Select a fruit"
    />
  );
}
`,
  },
  {
    title: "Custom Rendering",
    description:
      "Customize the appearance of options with custom rendering functions",
    preview: <CustomAutocompleteExample />,
    code: `"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Autocomplete, { Option } from "..";

interface CustomOption extends Option {
  icon: string;
}

const customFormSchema = z.object({
  programming_language: z
    .object({
      value: z.string(),
      label: z.string(),
      icon: z.string(),
    })
    .nullable(),
});

export function CustomAutocompleteExample() {
  const form = useForm<z.infer<typeof customFormSchema>>({
    resolver: zodResolver(customFormSchema),
    defaultValues: {
      programming_language: null,
    },
  });

  function onSubmit(values: z.infer<typeof customFormSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values);
  }

  const programmingLanguages: CustomOption[] = [
    { value: "js", label: "JavaScript", icon: "🟨" },
    { value: "py", label: "Python", icon: "🐍" },
    { value: "rb", label: "Ruby", icon: "💎" },
    { value: "java", label: "Java", icon: "☕" },
    { value: "cpp", label: "C++", icon: "🔷" },
  ];

  const renderOption = (option: CustomOption) => (
    <div className="flex items-center gap-2">
      <span>{option.icon}</span>
      <span>{option.label}</span>
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="programming_language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Programming Language</FormLabel>
              <FormControl>
                <Autocomplete
                  options={programmingLanguages}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select a programming language"
                  renderOption={renderOption as (option: Option) => ReactNode}
                />
              </FormControl>
              <FormDescription>
                Choose your favorite programming language.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
`,
  },
  {
    title: "Multi-Select Autocomplete",
    description: "Select multiple options with search",
    preview: <MultiSelectExample />,
    code: `"use client";
import { useState } from "react";
import Autocomplete, { Option } from "@/components/ui/autocomplete";

export function MultiSelectExample() {
  const [selectedCountries, setSelectedCountries] = useState<Option[] | null>(
    null
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
`,
  },
  {
    title: "Form Integration",
    description: "Using AsyncAutocomplete with React Hook Form",
    preview: <AutoCompleteFormExample />,
    code: `"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Autocomplete, { Option } from "..";

const formSchema = z.object({
  country: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable(),
  multipleCountries: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});

export function AutoCompleteFormExample() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: null,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const countries: Option[] = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="multipleCountries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Multiple Countries Selection</FormLabel>
              <FormControl>
                <Autocomplete
                  options={countries}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select multiple countries"
                  multiSelect={true}
                />
              </FormControl>
              <FormDescription>
                Choose multiple countries from the list.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
`,
  },
  {
    title: "Any Input",
    description:
      "Allow custom values to be entered in addition to predefined options",
    preview: <SkillsInputExample />,
    code: `"use client";
import Autocomplete, { Option } from "@/components/ui/auto-complete";
import { useState } from "react";
import predefinedSkills from "../data/allSkills.json";

export function SkillsInputExample() {
  const [skills, setSkills] = useState<Option[]>([]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Skills Input with Custom Values</h2>
      <Autocomplete
        multiSelect
        options={predefinedSkills}
        value={skills}
        onChange={setSkills as (value: Option | Option[] | null) => void}
        placeholder="Select or type your skills..."
        any={true} // Allow custom skill input
      />
      <p>
        Selected skills:{" "}
        {skills.length > 0
          ? skills.map((skill) => skill.label).join(", ")
          : "None"}
      </p>
    </div>
  );
}
`,
  },
];

export default function AutoCompleteCodeExample() {
  return <CodeExamples examples={usageExamples} />;
}
