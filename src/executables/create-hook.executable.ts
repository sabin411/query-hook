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
    Logger.success(`Directory ensured: ${dirPath}`);
  } catch (error) {
    Logger.error(`Error ensuring directory ${dirPath}: ${error}`);
  }
}

/**
 * Creates a file with the specified content.
 * @param {string} filePath - The path where the file will be created.
 * @param {string} content - The content to write into the file.
 * @returns {Promise<void>}
 */
async function createFile(filePath: string, content: string): Promise<void> {
  try {
    await writeFile(filePath, content, { encoding: "utf8" });
    Logger.success(`✅ File created successfully at ${filePath}`);
  } catch (error) {
    Logger.error(`🐛 Error creating file at ${filePath}: ${error}`);
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
    const hookPath = path.join(currentDir, hook, "api_hooks");

    const pathList = [typeScriptPath, servicePath, hookPath];

    // Ensure required directories exist
    pathList.forEach(async (dir) => await ensureDirectory(dir));

    // Create templates using the provided answers
    const template = new Template(answers);

    const toBeCreatedFiles = [
      {
        path: typeScriptPath,
        name: answers.typescript_file_name,
        template: () => template.typeScriptTemplate(),
      },
      {
        path: servicePath,
        name: answers.service_file_name,
        template: () => template.serviceTemplate(),
      },
      {
        path: hookPath,
        name: answers.hook_file_name,
        template: () => template.hookTemplate(),
      },
    ];

    // Generate all files
    toBeCreatedFiles.forEach(async (file) => {
      await createFile(path.join(file.path, file.name), file.template());
    });

    Logger.success("🎉 All files created successfully!");
  } catch (error) {
    Logger.error(`❌ Error in createHook function: ${error}`);
  }
}
