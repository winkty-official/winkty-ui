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
