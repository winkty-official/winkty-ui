// scripts/copyComponents.ts
import { LIBRARY_COMPONENTS } from "@/config/library-components";
import { promises as fs } from "fs";
import path from "path";

// Function to read and process a component file
async function processComponentFile(filePath: string): Promise<string> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    // Add any processing logic here if needed
    return content;
  } catch (error: any) {
    throw new Error(`Error reading file ${filePath}: ${error.message}`);
  }
}

// Function to write the component file
async function writeComponentFile(
  filePath: string,
  content: string,
): Promise<void> {
  try {
    await fs.writeFile(filePath, content, "utf-8");
  } catch (error: any) {
    throw new Error(`Error writing file ${filePath}: ${error.message}`);
  }
}

// Main copy function
async function copyComponents() {
  // Define your components to copy
  const components = LIBRARY_COMPONENTS;
  const srcDir = path.join(process.cwd(), "src/components/ui");
  const destDir = path.join(process.cwd(), "registry/ui");

  try {
    // Ensure destination directory exists
    await fs.mkdir(destDir, { recursive: true });

    // Copy each component
    for (const component of components) {
      const srcPath = path.join(srcDir, `${component}.tsx`);
      const destPath = path.join(destDir, `${component}.tsx`);

      try {
        // Check if source file exists
        await fs.access(srcPath);

        // Process and copy the file
        const content = await processComponentFile(srcPath);
        await writeComponentFile(destPath, content);
        console.log(`✓ Copied: ${component}.tsx`);
      } catch (error: any) {
        if (error.code === "ENOENT") {
          console.error(`✗ Component not found: ${component}.tsx`);
        } else {
          console.error(`✗ Error processing ${component}.tsx:`, error.message);
        }
      }
    }

    console.log("\n✓ Component copy operation completed successfully");
  } catch (error: any) {
    console.error("\n✗ Error during component copy operation:", error.message);
    process.exit(1);
  }
}

// Execute the copy operation
copyComponents().catch((error) => {
  console.error("✗ Fatal error:", error.message);
  process.exit(1);
});
