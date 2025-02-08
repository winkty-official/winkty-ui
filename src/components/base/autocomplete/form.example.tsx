"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { NormalAutocomplete, Option } from "./normal-autocomplete";
import { ReactNode, useState } from "react";
import { searchCountries } from "@/lib/api";

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

export function AutocompleteFormExample() {
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
                <NormalAutocomplete
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

// 1. Async Autocomplete Example
export function AsyncAutocompleteExample() {
  const [selectedCountry, setSelectedCountry] = useState<Option | Option[] | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Async Autocomplete</h2>
      <NormalAutocomplete
        loadOptions={searchCountries}
        value={selectedCountry}
        onChange={
          setSelectedCountry as (value: Option | Option[] | null) => void
        }
        placeholder="Search for a country..."
      />
      <p>Selected country: {selectedCountry?.label || "None"}</p>
    </div>
  );
}

// 2. Basic Autocomplete Example
const basicFormSchema = z.object({
  fruit: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable(),
});
export function BasicAutocompleteExample() {
  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      fruit: null,
    },
  });
  function onSubmit(values: z.infer<typeof basicFormSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }
  const fruits: Option[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
    { value: "elderberry", label: "Elderberry" },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fruit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Fruit</FormLabel>
              <FormControl>
                <NormalAutocomplete
                  options={fruits}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select a fruit"
                />
              </FormControl>
              <FormDescription>
                Choose your favorite fruit from the list.
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

// 3. Custom Autocomplete Example
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
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    // });
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
                <NormalAutocomplete
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
