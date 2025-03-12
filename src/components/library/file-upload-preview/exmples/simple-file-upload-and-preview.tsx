"use client";

import React, { useState, useCallback, memo, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CloudUpload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

export interface FileUploadPreviewHandle {
  reset: () => void;
}

interface ImageUploadProps {
  label?: string;
  defaultImage?: string | null;
  onFileChange: (data: { files: File[] | null; url: string | null }) => void;
  containerClassName?: string;
  imageClassName?: string;
  disabled?: boolean;
  multiple?: boolean;
}

const DEFAULT_ACCEPTED_TYPES = "image/*";
const PREVIEW_ASPECT_RATIO = "aspect-video";

const dragBorderVariants = {
  idle: {
    borderStyle: "dashed",
    borderDasharray: "8 4",
    borderWidth: "2px",
    borderColor: "hsl(var(--border))",
  },
  dragging: {
    borderStyle: "dashed",
    borderDasharray: "10 5",
    borderWidth: "2px",
    borderColor: "hsl(var(--primary))",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const ImageUpload = memo(
  forwardRef<FileUploadPreviewHandle, ImageUploadProps>(
    (
      {
        label,
        defaultImage,
        onFileChange,
        containerClassName = "",
        imageClassName = "",
        disabled = false,
        multiple = false,
      },
      ref
    ) => {
      const [previewUrls, setPreviewUrls] = useState<string[]>(defaultImage ? [defaultImage] : []);
      const [files, setFiles] = useState<File[]>([]);
      const [error, setError] = useState<string | null>(null);
      const fileInputRef = React.useRef<HTMLInputElement>(null);

      const cleanupPreviewUrls = useCallback(
        (urls: string[]) => {
          urls.forEach((url) => {
            if (url && url !== defaultImage && !url.startsWith("http")) {
              URL.revokeObjectURL(url);
            }
          });
        },
        [defaultImage]
      );

      const reset = useCallback(() => {
        cleanupPreviewUrls(previewUrls);
        setPreviewUrls(defaultImage ? [defaultImage] : []);
        setFiles([]);
        setError(null);
        onFileChange({ files: null, url: null });
      }, [cleanupPreviewUrls, previewUrls, defaultImage, onFileChange]);

      useImperativeHandle(ref, () => ({
        reset,
      }));

      const isDuplicateFile = useCallback(
        (newFile: File, existingFiles: File[]) => {
          return existingFiles.some(
            (file) =>
              file.name === newFile.name &&
              file.size === newFile.size &&
              file.lastModified === newFile.lastModified
          );
        },
        []
      );

      const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          const newFiles = event.target.files ? Array.from(event.target.files) : [];
          if (!newFiles.length || disabled) return;

          const uniqueNewFiles = newFiles.filter((file) => !isDuplicateFile(file, files));
          if (uniqueNewFiles.length === 0) {
            setError("All selected files are already added.");
            return;
          }

          const newPreviewUrls = uniqueNewFiles.map((file) => URL.createObjectURL(file));
          setPreviewUrls((prev) =>
            multiple ? [...prev, ...newPreviewUrls] : [newPreviewUrls[0]]
          );
          setFiles((prev) => (multiple ? [...prev, ...uniqueNewFiles] : [uniqueNewFiles[0]]));
          setError(null);

          onFileChange({
            files: uniqueNewFiles,
            url: multiple ? null : newPreviewUrls[0],
          });
        },
        [disabled, onFileChange, multiple, files, isDuplicateFile]
      );

      const handleEditClick = useCallback(() => {
        if (disabled || !fileInputRef.current) return;
        fileInputRef.current.click();
      }, [disabled]);

      const handleRemovePreview = useCallback(
        (index: number) => {
          setPreviewUrls((prev) => {
            const newUrls = [...prev];
            const removedUrl = newUrls.splice(index, 1)[0];
            if (removedUrl && !removedUrl.startsWith("http")) {
              URL.revokeObjectURL(removedUrl);
            }
            return newUrls;
          });
          setFiles((prev) => {
            const newFiles = [...prev];
            newFiles.splice(index, 1);
            return newFiles;
          });

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }

          onFileChange({
            files: files.length > 1 ? files.slice(0, index).concat(files.slice(index + 1)) : null,
            url: null,
          });
        },
        [files, onFileChange]
      );

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { [DEFAULT_ACCEPTED_TYPES]: [] },
        disabled,
        multiple,
        onDropAccepted: (acceptedFiles) => {
          const uniqueNewFiles = acceptedFiles.filter((file) => !isDuplicateFile(file, files));
          if (uniqueNewFiles.length === 0) {
            setError("All dropped files are already added.");
            return;
          }

          const newPreviewUrls = uniqueNewFiles.map((file) => URL.createObjectURL(file));
          setPreviewUrls((prev) =>
            multiple ? [...prev, ...newPreviewUrls] : [newPreviewUrls[0]]
          );
          setFiles((prev) => (multiple ? [...prev, ...uniqueNewFiles] : [uniqueNewFiles[0]]));
          setError(null);

          onFileChange({
            files: uniqueNewFiles,
            url: multiple ? null : newPreviewUrls[0],
          });
        },
        onDropRejected: () => {
          setError("Please upload a valid image file.");
        },
      });

      return (
        <div
          className={cn(
            "relative border rounded-md overflow-hidden bg-background border-border",
            disabled && "opacity-50 cursor-not-allowed",
            containerClassName
          )}
        >
          {label && (
            <div className="px-4 py-2 bg-muted border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
            </div>
          )}

          {!multiple && previewUrls.length > 0 ? (
            <div className={cn(PREVIEW_ASPECT_RATIO, "w-full relative group")}>
              <Image
                src={previewUrls[0]}
                alt={label || "Uploaded image preview"}
                fill
                className={cn("object-cover", imageClassName)}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={!!defaultImage}
              />
              {!disabled && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => handleRemovePreview(0)}
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">Remove image</span>
                </Button>
              )}
            </div>
          ) : (
            <div>
              <motion.div
                initial="idle"
                animate={isDragActive ? "dragging" : "idle"}
                variants={dragBorderVariants}
                className="p-1 rounded-md"
              >
                <div
                  {...getRootProps()}
                  onClick={handleEditClick}
                  className={cn(
                    !disabled &&
                      "bg-muted hover:bg-muted/80 transition-colors duration-200 rounded-md"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center h-48 rounded-md">
                    <CloudUpload className="w-12 h-12 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Drag and Drop images here
                    </span>
                    <span className="text-sm text-muted-foreground">Or</span>
                    <Button variant="outline" className="mt-2" disabled={disabled}>
                      Browse
                    </Button>
                  </div>
                  {error && (
                    <p className="text-sm text-destructive mt-2">{error}</p>
                  )}
                </div>
              </motion.div>

              {previewUrls.length > 0 && multiple && (
                <div className="mt-4 p-2">
                  <div className="flex flex-wrap gap-2">
                    {previewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative w-20 h-20 flex items-center justify-center"
                      >
                        <Image
                          src={url}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover rounded-md"
                        />
                        {!disabled && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1 bg-black/50 text-white hover:bg-black/70"
                            onClick={() => handleRemovePreview(index)}
                          >
                            <X className="w-4 h-4" />
                            <span className="sr-only">Remove image {index + 1}</span>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={DEFAULT_ACCEPTED_TYPES}
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
            multiple={multiple}
          />
        </div>
      );
    }
  )
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;