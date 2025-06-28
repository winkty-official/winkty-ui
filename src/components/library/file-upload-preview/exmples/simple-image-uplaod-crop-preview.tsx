"use client";

import React, { useState, useCallback, memo, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CloudUpload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming you're using shadcn/ui for the Select component

export interface FileUploadPreviewHandle {
  reset: () => void;
}

interface ImageUploadProps {
  label?: string;
  defaultImage?: string | null;
  onFileChange: (data: { file: File | null; url: string | null }) => void;
  containerClassName?: string;
  imageClassName?: string;
  disabled?: boolean;
}

const DEFAULT_ACCEPTED_TYPES = "image/*";
const PREVIEW_ASPECT_RATIO = "aspect-video";

// Define aspect ratio options
const aspectRatios = [
  { label: "Freeform", value: "freeform", ratio: undefined },
  { label: "Original", value: "original", ratio: "original" },
  { label: "Custom", value: "custom", ratio: "custom" },
  { label: "1:1 (Square)", value: "1:1", ratio: 1 },
  { label: "4:3 (Monitor)", value: "4:3", ratio: 4 / 3 },
  { label: "3:2", value: "3:2", ratio: 3 / 2 },
  { label: "16:9 (Widescreen)", value: "16:9", ratio: 16 / 9 },
  { label: "19:10", value: "19:10", ratio: 19 / 10 },
  { label: "21:9 (Cinemascope)", value: "21:9", ratio: 21 / 9 },
  { label: "32:9 (Super Ultra Wide)", value: "32:9", ratio: 32 / 9 },
  { label: "Facebook Profile 170x170", value: "fb-profile", ratio: 170 / 170 },
  { label: "Facebook Cover 820x312", value: "fb-cover", ratio: 820 / 312 },
  { label: "Facebook Post 1200x900", value: "fb-post", ratio: 1200 / 900 },
  { label: "Facebook Ad 1280x720", value: "fb-ad", ratio: 1280 / 720 },
  { label: "Instagram Profile 110x110", value: "ig-profile", ratio: 110 / 110 },
];

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
      },
      ref
    ) => {
      const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage || null);
      const [file, setFile] = useState<File | null>(null);
      const [error, setError] = useState<string | null>(null);
      const [crop, setCrop] = useState<Crop | undefined>(undefined);
      const [isCropping, setIsCropping] = useState(false);
      const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
      const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("freeform");
      const [originalAspectRatio, setOriginalAspectRatio] = useState<number | null>(null);
      const fileInputRef = React.useRef<HTMLInputElement>(null);

      const cleanupPreviewUrl = useCallback((url: string | null) => {
        if (url && url !== defaultImage && !url.startsWith("http")) {
          URL.revokeObjectURL(url);
        }
      }, [defaultImage]);

      const reset = useCallback(() => {
        if (previewUrl) cleanupPreviewUrl(previewUrl);
        setPreviewUrl(defaultImage || null);
        setFile(null);
        setError(null);
        setCrop(undefined);
        setIsCropping(false);
        setSelectedAspectRatio("freeform");
        onFileChange({ file: null, url: null });
      }, [cleanupPreviewUrl, defaultImage, onFileChange, previewUrl]);

      useImperativeHandle(ref, () => ({
        reset,
      }));

      const handleFileChange = useCallback(
        (newFile: File) => {
          if (disabled) return;

          if (previewUrl) cleanupPreviewUrl(previewUrl);
          const newPreviewUrl = URL.createObjectURL(newFile);
          setPreviewUrl(newPreviewUrl);
          setFile(newFile);
          setError(null);
          setIsCropping(true); // Open crop interface immediately after upload
        },
        [disabled, previewUrl, cleanupPreviewUrl]
      );

      const onDropAccepted = useCallback(
        (acceptedFiles: File[]) => {
          if (acceptedFiles.length > 0) {
            handleFileChange(acceptedFiles[0]);
          }
        },
        [handleFileChange]
      );

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { [DEFAULT_ACCEPTED_TYPES]: [] },
        disabled,
        multiple: false, // Enforce single file mode
        onDropAccepted,
        onDropRejected: () => {
          setError("Please upload a valid image file.");
        },
      });

      const handleEditClick = useCallback(() => {
        if (disabled || !fileInputRef.current) return;
        fileInputRef.current.click();
      }, [disabled]);

      const handleRemovePreview = useCallback(() => {
        if (previewUrl) cleanupPreviewUrl(previewUrl);
        setPreviewUrl(null);
        setFile(null);
        setCrop(undefined);
        setIsCropping(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        onFileChange({ file: null, url: null });
      }, [previewUrl, cleanupPreviewUrl, onFileChange]);

      const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        setOriginalAspectRatio(width / height);
        const crop: Crop = {
          unit: "%",
          width: 90,
          height: 90,
          x: 5,
          y: 5,
        };
        setCrop(crop);
        setImageRef(e.currentTarget);
      }, []);

      const getCroppedImage = useCallback(
        async (image: HTMLImageElement, crop: Crop): Promise<File> => {
          const canvas = document.createElement("canvas");
          const scaleX = image.naturalWidth / image.width;
          const scaleY = image.naturalHeight / image.height;

          const pixelCropWidth = crop.width * (image.width / 100);
          const pixelCropHeight = crop.height * (image.height / 100);
          const pixelCropX = crop.x * (image.width / 100);
          const pixelCropY = crop.y * (image.height / 100);

          canvas.width = pixelCropWidth * scaleX;
          canvas.height = pixelCropHeight * scaleY;

          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas context not available");

          ctx.drawImage(
            image,
            pixelCropX * scaleX,
            pixelCropY * scaleY,
            pixelCropWidth * scaleX,
            pixelCropHeight * scaleY,
            0,
            0,
            pixelCropWidth * scaleX,
            pixelCropHeight * scaleY
          );

          return new Promise((resolve) => {
            canvas.toBlob((blob) => {
              if (!blob) throw new Error("Failed to create blob");
              const croppedFile = new File([blob], file?.name || "cropped-image.jpg", {
                type: "image/jpeg",
              });
              resolve(croppedFile);
            }, "image/jpeg", 1.0);
          });
        },
        [file]
      );

      const handleCropComplete = useCallback(async () => {
        if (!imageRef || !crop || !file) return;

        try {
          const croppedFile = await getCroppedImage(imageRef, crop);
          if (previewUrl) cleanupPreviewUrl(previewUrl);
          const newPreviewUrl = URL.createObjectURL(croppedFile);
          setPreviewUrl(newPreviewUrl);
          setFile(croppedFile);
          setIsCropping(false);
          onFileChange({ file: croppedFile, url: newPreviewUrl });
        } catch (err) {
          setError("Failed to crop image.");
        }
      }, [imageRef, crop, file, previewUrl, cleanupPreviewUrl, onFileChange, getCroppedImage]);

      const handleAspectRatioChange = (value: string) => {
        setSelectedAspectRatio(value);
        const selected = aspectRatios.find((ar) => ar.value === value);
        if (selected) {
          if (selected.value === "original" && originalAspectRatio) {
            setCrop((prev) => (prev ? { ...prev, aspect: originalAspectRatio } : undefined));
          } else if (selected.value === "custom") {
            // For custom, you'd need additional UI to input custom ratios (not implemented here)
            setCrop((prev) => (prev ? { ...prev, aspect: undefined } : undefined));
          } else {
            setCrop((prev) => (prev ? { ...prev, aspect: selected.ratio } : undefined));
          }
        }
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

          {previewUrl && !isCropping ? (
            <div className={cn(PREVIEW_ASPECT_RATIO, "w-full relative group")}>
              <Image
                src={previewUrl}
                alt={label || "Uploaded image preview"}
                fill
                className={cn("object-cover", imageClassName)}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={!!defaultImage}
              />
              {!disabled && (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 bg-black/50 text-white hover:bg-black/70"
                    onClick={handleRemovePreview}
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute bottom-1 right-1 bg-black/50 text-white hover:bg-black/70"
                    onClick={() => setIsCropping(true)}
                  >
                    Crop
                  </Button>
                </>
              )}
            </div>
          ) : (
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
                    Drag and Drop an image here
                  </span>
                  <span className="text-sm text-muted-foreground">Or</span>
                  <Button variant="outline" className="mt-2" disabled={disabled}>
                    Browse
                  </Button>
                </div>
                {error && <p className="text-sm text-destructive mt-2">{error}</p>}
              </div>
            </motion.div>
          )}

          {isCropping && previewUrl && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-background p-4 rounded-md max-w-2xl w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Crop Image</h3>
                  <Select onValueChange={handleAspectRatioChange} value={selectedAspectRatio}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      {aspectRatios.map((ar) => (
                        <SelectItem key={ar.value} value={ar.value}>
                          {ar.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  aspect={
                    selectedAspectRatio === "original" && originalAspectRatio
                      ? originalAspectRatio
                      : aspectRatios.find((ar) => ar.value === selectedAspectRatio)?.ratio
                  }
                  className="max-h-[70vh]"
                >
                  <Image
                    src={previewUrl}
                    alt="Crop preview"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCropping(false);
                      if (!file) handleRemovePreview();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCropComplete}>Save Crop</Button>
                </div>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={DEFAULT_ACCEPTED_TYPES}
            className="hidden"
            onChange={(e) => {
              const newFile = e.target.files?.[0];
              if (newFile) handleFileChange(newFile);
            }}
            disabled={disabled}
            multiple={false}
          />
        </div>
      );
    }
  )
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;

// "use client";

// import React, { useState, useCallback, memo, forwardRef, useImperativeHandle } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { CloudUpload, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useDropzone } from "react-dropzone";
// import ReactCrop, { type Crop } from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";

// export interface FileUploadPreviewHandle {
//   reset: () => void;
// }

// interface ImageUploadProps {
//   label?: string;
//   defaultImage?: string | null;
//   onFileChange: (data: { file: File | null; url: string | null }) => void;
//   containerClassName?: string;
//   imageClassName?: string;
//   disabled?: boolean;
// }

// const DEFAULT_ACCEPTED_TYPES = "image/*";
// const PREVIEW_ASPECT_RATIO = "aspect-video";

// const dragBorderVariants = {
//   idle: {
//     borderStyle: "dashed",
//     borderDasharray: "8 4",
//     borderWidth: "2px",
//     borderColor: "hsl(var(--border))",
//   },
//   dragging: {
//     borderStyle: "dashed",
//     borderDasharray: "10 5",
//     borderWidth: "2px",
//     borderColor: "hsl(var(--primary))",
//     transition: { duration: 0.3, ease: "easeInOut" },
//   },
// };

// const ImageUpload = memo(
//   forwardRef<FileUploadPreviewHandle, ImageUploadProps>(
//     (
//       {
//         label,
//         defaultImage,
//         onFileChange,
//         containerClassName = "",
//         imageClassName = "",
//         disabled = false,
//       },
//       ref
//     ) => {
//       const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage || null);
//       const [file, setFile] = useState<File | null>(null);
//       const [error, setError] = useState<string | null>(null);
//       const [crop, setCrop] = useState<Crop | undefined>(undefined);
//       const [isCropping, setIsCropping] = useState(false);
//       const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
//       const fileInputRef = React.useRef<HTMLInputElement>(null);

//       const cleanupPreviewUrl = useCallback((url: string | null) => {
//         if (url && url !== defaultImage && !url.startsWith("http")) {
//           URL.revokeObjectURL(url);
//         }
//       }, [defaultImage]);

//       const reset = useCallback(() => {
//         if (previewUrl) cleanupPreviewUrl(previewUrl);
//         setPreviewUrl(defaultImage || null);
//         setFile(null);
//         setError(null);
//         setCrop(undefined);
//         setIsCropping(false);
//         onFileChange({ file: null, url: null });
//       }, [cleanupPreviewUrl, defaultImage, onFileChange, previewUrl]);

//       useImperativeHandle(ref, () => ({
//         reset,
//       }));

//       const handleFileChange = useCallback(
//         (newFile: File) => {
//           if (disabled) return;

//           if (previewUrl) cleanupPreviewUrl(previewUrl);
//           const newPreviewUrl = URL.createObjectURL(newFile);
//           setPreviewUrl(newPreviewUrl);
//           setFile(newFile);
//           setError(null);
//           setIsCropping(true); // Open crop interface immediately after upload
//         },
//         [disabled, previewUrl, cleanupPreviewUrl]
//       );

//       const onDropAccepted = useCallback(
//         (acceptedFiles: File[]) => {
//           if (acceptedFiles.length > 0) {
//             handleFileChange(acceptedFiles[0]);
//           }
//         },
//         [handleFileChange]
//       );

//       const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         accept: { [DEFAULT_ACCEPTED_TYPES]: [] },
//         disabled,
//         multiple: false, // Enforce single file mode
//         onDropAccepted,
//         onDropRejected: () => {
//           setError("Please upload a valid image file.");
//         },
//       });

//       const handleEditClick = useCallback(() => {
//         if (disabled || !fileInputRef.current) return;
//         fileInputRef.current.click();
//       }, [disabled]);

//       const handleRemovePreview = useCallback(() => {
//         if (previewUrl) cleanupPreviewUrl(previewUrl);
//         setPreviewUrl(null);
//         setFile(null);
//         setCrop(undefined);
//         setIsCropping(false);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//         onFileChange({ file: null, url: null });
//       }, [previewUrl, cleanupPreviewUrl, onFileChange]);

//       const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
//         const { width, height } = e.currentTarget;
//         const crop: Crop = {
//           unit: "%",
//           width: 90,
//           height: 90,
//           x: 5,
//           y: 5,
//         };
//         setCrop(crop);
//         setImageRef(e.currentTarget);
//       }, []);

//       const getCroppedImage = useCallback(
//         async (image: HTMLImageElement, crop: Crop): Promise<File> => {
//           const canvas = document.createElement("canvas");
//           const scaleX = image.naturalWidth / image.width;
//           const scaleY = image.naturalHeight / image.height;
      
//           // Convert crop dimensions from percentage to pixels based on displayed size,
//           // then scale to natural size
//           const pixelCropWidth = crop.width * (image.width / 100); // Convert % to pixels
//           const pixelCropHeight = crop.height * (image.height / 100);
//           const pixelCropX = crop.x * (image.width / 100);
//           const pixelCropY = crop.y * (image.height / 100);
      
//           // Set canvas size to the full resolution of the cropped area
//           canvas.width = pixelCropWidth * scaleX;
//           canvas.height = pixelCropHeight * scaleY;
      
//           const ctx = canvas.getContext("2d");
//           if (!ctx) throw new Error("Canvas context not available");
      
//           ctx.drawImage(
//             image,
//             pixelCropX * scaleX, // Source X in original image
//             pixelCropY * scaleY, // Source Y in original image
//             pixelCropWidth * scaleX, // Source width in original image
//             pixelCropHeight * scaleY, // Source height in original image
//             0, // Destination X
//             0, // Destination Y
//             pixelCropWidth * scaleX, // Destination width
//             pixelCropHeight * scaleY // Destination height
//           );
      
//           return new Promise((resolve) => {
//             canvas.toBlob((blob) => {
//               if (!blob) throw new Error("Failed to create blob");
//               const croppedFile = new File([blob], file?.name || "cropped-image.jpg", {
//                 type: "image/jpeg",
//               });
//               resolve(croppedFile);
//             }, "image/jpeg", 1.0); // Quality set to 1.0 for maximum quality
//           });
//         },
//         [file]
//       );

//       const handleCropComplete = useCallback(async () => {
//         if (!imageRef || !crop || !file) return;

//         try {
//           const croppedFile = await getCroppedImage(imageRef, crop);
//           if (previewUrl) cleanupPreviewUrl(previewUrl);
//           const newPreviewUrl = URL.createObjectURL(croppedFile);
//           setPreviewUrl(newPreviewUrl);
//           setFile(croppedFile);
//           setIsCropping(false);
//           onFileChange({ file: croppedFile, url: newPreviewUrl });
//         } catch (err) {
//           setError("Failed to crop image.");
//         }
//       }, [imageRef, crop, file, previewUrl, cleanupPreviewUrl, onFileChange, getCroppedImage]);

//       return (
//         <div
//           className={cn(
//             "relative border rounded-md overflow-hidden bg-background border-border",
//             disabled && "opacity-50 cursor-not-allowed",
//             containerClassName
//           )}
//         >
//           {label && (
//             <div className="px-4 py-2 bg-muted border-b border-border">
//               <span className="text-sm font-medium text-muted-foreground">{label}</span>
//             </div>
//           )}

//           {previewUrl && !isCropping ? (
//             <div className={cn(PREVIEW_ASPECT_RATIO, "w-full relative group")}>
//               <Image
//                 src={previewUrl}
//                 alt={label || "Uploaded image preview"}
//                 fill
//                 className={cn("object-cover", imageClassName)}
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 priority={!!defaultImage}
//               />
//               {!disabled && (
//                 <>
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute top-1 right-1 bg-black/50 text-white hover:bg-black/70"
//                     onClick={handleRemovePreview}
//                   >
//                     <X className="w-4 h-4" />
//                     <span className="sr-only">Remove image</span>
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     className="absolute bottom-1 right-1 bg-black/50 text-white hover:bg-black/70"
//                     onClick={() => setIsCropping(true)}
//                   >
//                     Crop
//                   </Button>
//                 </>
//               )}
//             </div>
//           ) : (
//             <motion.div
//               initial="idle"
//               animate={isDragActive ? "dragging" : "idle"}
//               variants={dragBorderVariants}
//               className="p-1 rounded-md"
//             >
//               <div
//                 {...getRootProps()}
//                 onClick={handleEditClick}
//                 className={cn(
//                   !disabled &&
//                     "bg-muted hover:bg-muted/80 transition-colors duration-200 rounded-md"
//                 )}
//               >
//                 <input {...getInputProps()} />
//                 <div className="flex flex-col items-center justify-center h-48 rounded-md">
//                   <CloudUpload className="w-12 h-12 text-muted-foreground mb-2" />
//                   <span className="text-sm text-muted-foreground">
//                     Drag and Drop an image here
//                   </span>
//                   <span className="text-sm text-muted-foreground">Or</span>
//                   <Button variant="outline" className="mt-2" disabled={disabled}>
//                     Browse
//                   </Button>
//                 </div>
//                 {error && <p className="text-sm text-destructive mt-2">{error}</p>}
//               </div>
//             </motion.div>
//           )}

//           {isCropping && previewUrl && (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//               <div className="bg-background p-4 rounded-md max-w-2xl w-full">
//                 <ReactCrop
//                   crop={crop}
//                   onChange={(_, percentCrop) => setCrop(percentCrop)}
//                   aspect={undefined} // Freeform cropping; set to a number (e.g., 1) for fixed aspect
//                   className="max-h-[70vh]"
//                 >
//                   <Image
//                     src={previewUrl}
//                     alt="Crop preview"
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                     className="w-full h-auto"
//                     onLoad={onImageLoad}
//                   />
//                 </ReactCrop>
//                 <div className="flex justify-end gap-2 mt-4">
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       setIsCropping(false);
//                       if (!file) handleRemovePreview(); // Remove if no file was saved yet
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button onClick={handleCropComplete}>Save Crop</Button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept={DEFAULT_ACCEPTED_TYPES}
//             className="hidden"
//             onChange={(e) => {
//               const newFile = e.target.files?.[0];
//               if (newFile) handleFileChange(newFile);
//             }}
//             disabled={disabled}
//             multiple={false} // Enforce single file mode
//           />
//         </div>
//       );
//     }
//   )
// );

// ImageUpload.displayName = "ImageUpload";

// export default ImageUpload;