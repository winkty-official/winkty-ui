"use client";

import React, { useState, useEffect, useCallback, memo, useImperativeHandle, forwardRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, CloudUpload, Loader2, X, Trash2, FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDropzone } from "react-dropzone";

interface AriaProps {
  "aria-label": string;
  "aria-disabled": boolean;
  role: string;
  tabIndex: number;
  "aria-dropeffect"?: "link" | "copy" | "none" | "move" | "execute" | "popup";
  "aria-describedby"?: string;
}

export interface ImageUploadPremiumHandle {
  reset: () => void;
}

interface ImageUploadPremiumProps {
  label?: string;
  defaultImage?: string | null;
  onFileChange: (data: { files: File[] | null; url: string | null }) => void;
  acceptedFileTypes?: string;
  containerClassName?: string;
  imageClassName?: string;
  disabled?: boolean;
  returnFormat?: "file" | "url" | "both";
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

const ImageUploadPremium = memo(
  forwardRef<ImageUploadPremiumHandle, ImageUploadPremiumProps>(
    (
      {
        label,
        defaultImage,
        onFileChange,
        acceptedFileTypes = DEFAULT_ACCEPTED_TYPES,
        containerClassName = "",
        imageClassName = "",
        disabled = false,
        returnFormat = "both",
        multiple = false,
      },
      ref
    ) => {
      const [previewUrls, setPreviewUrls] = useState<string[]>(defaultImage ? [defaultImage] : []);
      const [files, setFiles] = useState<File[]>([]); // Store File objects for non-image types
      const [inputUrl, setInputUrl] = useState<string>("");
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [activeTab, setActiveTab] = useState<"file" | "url" | "preview">("file");
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

      useEffect(() => {
        setPreviewUrls(defaultImage ? [defaultImage] : []);
        setFiles([]);
        return () => cleanupPreviewUrls(previewUrls);
      }, [defaultImage, cleanupPreviewUrls]);

      const reset = useCallback(() => {
        console.log("reset called");
        cleanupPreviewUrls(previewUrls);
        setPreviewUrls(defaultImage ? [defaultImage] : []);
        setFiles([]);
        setInputUrl("");
        setIsLoading(false);
        setError(null);
        setActiveTab("file");
        onFileChange({ files: null, url: null });
      }, [previewUrls, onFileChange, disabled, defaultImage]);

      useImperativeHandle(ref, () => ({
        reset,
      }));

      const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          const newFiles = event.target.files ? Array.from(event.target.files) : [];
          if (!newFiles.length || disabled) return;

          const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
          setPreviewUrls((prev) => (multiple ? [...prev, ...newPreviewUrls] : [newPreviewUrls[0]]));
          setFiles((prev) => (multiple ? [...prev, ...newFiles] : [newFiles[0]]));
          setError(null);
          setActiveTab("file");

          const returnData = {
            files: returnFormat === "url" ? null : newFiles,
            url: returnFormat === "file" ? null : multiple ? null : newPreviewUrls[0],
          };
          onFileChange(returnData);
        },
        [disabled, onFileChange, returnFormat, multiple]
      );

      const handleUrlSubmit = useCallback(async () => {
        if (!inputUrl || disabled) return;

        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(inputUrl, { method: "HEAD" });
          const contentType = response.headers.get("content-type");

          if (!contentType?.startsWith("image/")) {
            throw new Error("URL must point to an image");
          }

          const blobResponse = await fetch(inputUrl);
          const blob = await blobResponse.blob();
          const file = new File([blob], "image-from-url.jpg", { type: blob.type });

          const fileUrl = URL.createObjectURL(file);
          setPreviewUrls((prev) => (multiple ? [...prev, fileUrl] : [fileUrl]));
          setFiles((prev) => (multiple ? [...prev, file] : [file]));
          setActiveTab("file");

          const returnData = {
            files: returnFormat === "url" ? null : [file],
            url: returnFormat === "file" ? null : inputUrl,
          };
          onFileChange(returnData);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load image from URL");
          setPreviewUrls(defaultImage ? [defaultImage] : []);
          setFiles([]);
          setActiveTab("url");
          onFileChange({ files: null, url: null });
        } finally {
          setIsLoading(false);
          setInputUrl("");
        }
      }, [inputUrl, disabled, onFileChange, returnFormat, multiple, defaultImage]);

      const handleEditClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.stopPropagation();
          if (disabled || !fileInputRef.current) return;
          fileInputRef.current.click();
        },
        [disabled]
      );

      const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleEditClick(e);
          }
        },
        [handleEditClick]
      );

      const handleTabChange = useCallback((value: string) => {
        if (disabled) return;
        const validTab = value === "file" || value === "url" ? value : "file";
        setActiveTab(validTab);
        setError(null);
        setInputUrl("");
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
            // onFileChange({
            //   files: newFiles.length > 0 ? newFiles : null,
            //   url: null,
            // });
            return newFiles;
          });
        },
        [onFileChange]
      );

      // Effect to trigger onFileChange after files change
      useEffect(() => {
        onFileChange({
          files: files.length > 0 ? files : null,
          url: null,
        });
      }, [files, onFileChange]);

      const isImageFile = (file: File) => {
        return file.type.startsWith("image/");
      };

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: acceptedFileTypes
          .split(",")
          .reduce((acc, type) => ({ ...acc, [type.trim()]: [] }), {} as Record<string, string[]>),
        disabled: disabled || activeTab !== "file",
        multiple,
        onDropAccepted: (acceptedFiles) => {
          const newFiles = acceptedFiles;
          if (!newFiles.length) return;

          const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
          setPreviewUrls((prev) => (multiple ? [...prev, ...newPreviewUrls] : [newPreviewUrls[0]]));
          setFiles((prev) => (multiple ? [...prev, ...newFiles] : [newFiles[0]]));
          setError(null);
          setActiveTab("file");

          const returnData = {
            files: returnFormat === "url" ? null : newFiles,
            url: returnFormat === "file" ? null : multiple ? null : newPreviewUrls[0],
          };
          onFileChange(returnData);
        },
        onDropRejected: () => {
          setError("Invalid file type or format. Please upload a supported file.");
        },
      });

      const ariaProps: AriaProps = {
        "aria-label": label || "File upload",
        "aria-disabled": disabled,
        role: "button",
        tabIndex: disabled ? -1 : 0,
        "aria-dropeffect": activeTab === "file" ? "copy" : undefined,
        "aria-describedby": error ? "upload-error" : undefined,
      };

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

          <Tabs
            value={activeTab === "preview" ? "file" : activeTab}
            onValueChange={handleTabChange}
            className="w-full"
            aria-disabled={disabled}
          >
            <TabsList className="w-full bg-transparent border-b border-border">
              <TabsTrigger
                value="file"
                className={cn(
                  "flex-1 py-2 text-sm font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary text-foreground hover:text-foreground/80 transition-colors",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                My Files
              </TabsTrigger>
              <TabsTrigger
                value="url"
                className={cn(
                  "flex-1 py-2 text-sm font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary text-foreground hover:text-foreground/80 transition-colors",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                Web Address
              </TabsTrigger>
            </TabsList>

            <TabsContent value="file" className="mt-2">
              {!multiple && previewUrls.length > 0 && isImageFile(files[0]) ? (
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
                    <div
                      className="absolute inset-0 bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      onClick={handleEditClick}
                      onKeyDown={handleKeyDown}
                      {...ariaProps}
                    >
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-transparent"
                        disabled={disabled}
                      >
                        <PencilIcon aria-hidden="true" className="w-5 h-5 animate-pulse" />
                        <span className="sr-only">Edit file</span>
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <motion.div
                    initial="idle"
                    animate={isDragActive ? "dragging" : "idle"}
                    variants={dragBorderVariants}
                    className={cn("p-1 rounded-md")}
                  >
                    <div
                      {...getRootProps()}
                      onClick={handleEditClick}
                      onKeyDown={handleKeyDown}
                      role="button"
                      tabIndex={disabled ? -1 : 0}
                      aria-label={label || "File upload"}
                      aria-disabled={disabled}
                      aria-dropeffect={activeTab === "file" ? "copy" : undefined}
                      aria-describedby={error ? "upload-error" : undefined}
                      className={cn(
                        !disabled &&
                          "bg-muted hover:bg-muted/80 transition-colors duration-200 rounded-md"
                      )}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center justify-center h-48 rounded-md">
                        <CloudUpload className="w-12 h-12 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Drag and Drop assets here
                        </span>
                        <span className="text-sm text-muted-foreground">Or</span>
                        <Button variant="outline" className="mt-2" disabled={disabled}>
                          Browse
                        </Button>
                      </div>
                      {error && (
                        <p id="upload-error" className="text-sm text-destructive mt-2">
                          {error}
                        </p>
                      )}
                    </div>
                  </motion.div>
                  {previewUrls.length > 0 && (
                    <div className="mt-4 p-2">
                      {multiple ? (
                        <div className="flex flex-wrap gap-2">
                          {previewUrls.map((url, index) => (
                            <div
                              key={index}
                              className={cn(
                                "relative  flex items-center justify-center",
                                isImageFile(files[index]) ? "bg-transparent w-20 h-20" : "bg-muted rounded-sm"
                              )}
                            >
                              {isImageFile(files[index]) ? (
                                <Image
                                  src={url}
                                  alt={`Preview ${index + 1}`}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center text-center p-2">
                                  <FileIcon className="w-6 h-6 text-muted-foreground mb-1" />
                                  <span className="text-xs text-muted-foreground truncate w-full">
                                    {files[index]?.name || "Unknown File"}
                                  </span>
                                </div>
                              )}
                              {!disabled && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-1 right-1 bg-black/50 text-white hover:bg-black/70"
                                  onClick={() => handleRemovePreview(index)}
                                >
                                  <X className="w-4 h-4" />
                                  <span className="sr-only">Remove file {index + 1}</span>
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : !isImageFile(files[0]) && (
                        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <FileIcon className="w-6 h-6 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {files[0]?.name || "Unknown File"}
                            </span>
                          </div>
                          {!disabled && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemovePreview(0)}
                            >
                              <X className="w-4 h-4" />
                              <span className="sr-only">Remove file</span>
                            </Button>
                          )}
                        </div>
                      )}
                      {!disabled && multiple && (
                        <Button
                          variant="outline"
                          className="mt-4 w-full"
                          onClick={reset}
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Reset Uploads
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="url" className="mt-0">
              <div className="p-4 space-y-2">
                <Input
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  className="w-full"
                  disabled={disabled || isLoading}
                  aria-label="Image URL input"
                />
                {error && (
                  <p id="upload-error" className="text-sm text-destructive">
                    {error}
                  </p>
                )}
                <Button
                  onClick={handleUrlSubmit}
                  disabled={disabled || isLoading || !inputUrl}
                  className="w-full"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Browse"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFileTypes}
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
            aria-hidden="true"
            multiple={multiple}
          />
        </div>
      );
    }
  )
);

ImageUploadPremium.displayName = "ImageUploadPremium";

export default ImageUploadPremium;