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
import Autocomplete, { Option } from "@/components/ui/auto-complete";

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
