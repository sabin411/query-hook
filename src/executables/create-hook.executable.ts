import { writeFile, mkdir } from "fs/promises";
import { Logger } from "../utils";
import { CliAnswers } from "../types";
import { Template } from "../templates";

const path = require("path");

/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath - The directory path to check or create.
 * @returns {Promise<void>}
 */
async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await mkdir(dirPath, { recursive: true });
    Logger.info(`Directory ensured: ${dirPath}`);
  } catch (error) {
    const errorMsg = `Error ensuring directory ${dirPath}: ${error}`;
    Logger.error(errorMsg);
    throw new Error(errorMsg);
  }
}

/**
 * Creates a file with the specified content.
 * @param {string} filePath - The path where the file will be created.
 * @param {string} content - The content to write into the file.
 * @param {string} fileName - The name of the file that will be created and to be exported from the index.ts file.
 * @returns {Promise<void>}
 */
async function createFile(
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

/**
 * Main function to create a hook based on user inputs.
 * @param {CliAnswers} answers - User-provided CLI answers.
 * @returns {Promise<void>}
 */
export async function createHook(answers: CliAnswers): Promise<void> {
  try {
    const currentDir = process.cwd();
    const configs = require(path.join(currentDir, "hookApi.json"));

    // Extract paths from configuration
    const { typeScript, service, hook } = configs.exportPath;
    const typeScriptPath = path.join(currentDir, typeScript);
    const servicePath = path.join(currentDir, service);
    const hookPath = path.join(currentDir, hook);

    const pathList = [typeScriptPath, servicePath, hookPath];

    // Ensure required directories exist
    // * pathList.forEach(async (dir) => await ensureDirectory(dir)); // Wondering why not just use forEach?
    // * Thats because, forEach does not work as expected with asynchronous operations. This happens because forEach does not await the promises within its callback, which might cause some directories or files to be processed before they are properly created. This was a news for me too.
    for (const dir of pathList) {
      await ensureDirectory(dir);
    }

    // Create templates using the provided answers
    const template = new Template(answers);

    const toBeCreatedFiles = [
      {
        path: typeScriptPath,
        name: answers.typescript_file_name,
        template: () => template.typeScriptTemplate(),
        fileName: answers.typescript_file_name.replace(".ts", ""),
      },
      {
        path: servicePath,
        name: answers.service_file_name,
        template: () => template.serviceTemplate(),
        fileName: answers.service_file_name.replace(".ts", ""),
      },
      {
        path: hookPath,
        name: answers.hook_file_name,
        template: () => template.hookTemplate(),
        fileName: answers.hook_file_name.replace(".tsx", ""),
      },
    ];

    // Generate all files
    // * Same reason as above 👆🏻
    for (const file of toBeCreatedFiles) {
      await createFile(
        path.join(file.path, file.name),
        file.template(),
        file.fileName,
      );
    }

    Logger.success("🎉 All files created successfully!");
  } catch (error) {
    Logger.error(`❌ Error in createHook function: ${error}`);
    throw error;
  }
}
