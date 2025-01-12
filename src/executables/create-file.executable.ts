const path = require("path");
import { Logger } from "../utils";
import { writeFile } from "fs/promises";

/**
 * Creates a file with the specified content.
 * @param {string} filePath - The path where the file will be created.
 * @param {string} content - The content to write into the file.
 * @param {string} fileName - The name of the file that will be created and to be exported from the index.ts file.
 * @returns {Promise<void>}
 */
export async function createFile(
  filePath: string,
  content: string,
  fileName: string,
): Promise<void> {
  try {
    await writeFile(filePath, content, { encoding: "utf8" });

    // Export the file from the index.ts file if index.ts doesn't exist then create one and export the file.
    // else just append the export statement to the index.ts file.
    const indexFilePath = path.join(filePath, "..", "index.ts");
    const exportStatement = `export * from "./${fileName}";\n`;

    await writeFile(indexFilePath, exportStatement, {
      encoding: "utf8",
      flag: "a",
    });
    Logger.success(`✅ File created successfully at ${filePath}`);
  } catch (error) {
    const errorMsg = `🐛 Error creating file at ${filePath}: ${error}`;
    Logger.error(errorMsg);
    throw new Error(errorMsg);
  }
}
