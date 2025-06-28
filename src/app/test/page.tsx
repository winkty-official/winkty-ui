"use client";

import SimpleFileUpload from "@/components/library/file-upload-preview/exmples/simple-file-upload-and-preview";
import { Button } from "@/components/ui/button";
import FileUploadPreview, {
  FileUploadPreviewHandle,
} from "@/components/ui/file-upload-preview";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

// Form schema with Zod
const formSchema = z.object({
  images: z.object({
    files: z.array(z.instanceof(File)).nullable().optional(),
    url: z.string().nullable().optional(),
  }),
});

type FormData = z.infer<typeof formSchema>;

const TestImageUploadPremiumPage = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: { files: null, url: null },
    },
  });

  const imageUploadRef = useRef<FileUploadPreviewHandle>(null);

  const handleReset = useCallback(() => {
    if (imageUploadRef.current) {
      imageUploadRef.current.reset(); // Reset the component
    }
    form.reset({ images: { files: null, url: null } }); // Reset form state
  }, [form]);

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    async (data) => {
      console.log("Form submitted:", {
        files: data.images.files
          ? data.images.files.map((file) => file.name)
          : "No files selected",
        url: data.images.url || "No URL provided",
      });

      // Example: Send to backend
      const formData = new FormData();
      if (data.images.files) {
        data.images.files.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });
      }
      if (data.images.url) formData.append("url", data.images.url);

      try {
        // Simulated API call
        // await fetch("/api/upload", { method: "POST", body: formData });
        console.log("Upload successful");
        handleReset(); // Reset after successful submission
      } catch (error) {
        console.error("Upload failed:", error);
      }
    },
    [handleReset],
  );

  const handleFileChange = useCallback(
    (data: { files: File[] | null; url: string | null }) => {
      console.log("🚀 ~ TestImageUploadPremiumPage ~ data:", data);
      const currentFiles = form.getValues("images.files") || [];
      const newFiles = data.files || [];

      const mergedFiles = [
        ...currentFiles.filter((existingFile) =>
          newFiles.every((newFile) => newFile.name !== existingFile.name),
        ),
        ...newFiles,
      ];

      form.setValue(
        "images",
        {
          files: mergedFiles.length > 0 ? mergedFiles : null,
          url: data.url,
        },
        { shouldValidate: true },
      );
    },
    [form],
  );

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-background p-4",
      )}
    >
      <div className="w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Test Image Upload Premium
          </h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Profile Files
                  </FormLabel>
                  <FormControl>
                    <FileUploadPreview
                      ref={imageUploadRef}
                      onFileChange={handleFileChange}
                      containerClassName="w-full"
                      disabled={form.formState.isSubmitting}
                      // returnFormat="url"
                      multiple={false}
                      acceptedFileTypes="image/*,application/pdf,application/vnd.ms-excel" // Allow images, PDFs, and XLS
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Profile Files
                  </FormLabel>
                  <FormControl>
                    <SimpleFileUpload
                      ref={imageUploadRef}
                      onFileChange={handleFileChange}
                      containerClassName="w-full"
                      disabled={form.formState.isSubmitting}
                      // returnFormat="url"
                      multiple={true}
                      // acceptedFileTypes="image/*,application/pdf,application/vnd.ms-excel" // Allow images, PDFs, and XLS
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
            {/*    <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Profile Files
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      ref={imageUploadRef}
                      onFileChange={handleFileChange}
                      containerClassName="w-full"
                      disabled={form.formState.isSubmitting}
                      // returnFormat="url"
                      multiple={true}
                      // acceptedFileTypes="image/*,application/pdf,application/vnd.ms-excel" // Allow images, PDFs, and XLS
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            /> */}
            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleReset}
                disabled={form.formState.isSubmitting}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TestImageUploadPremiumPage;
