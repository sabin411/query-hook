import { mkdir } from "fs/promises";
import { Logger } from "../utils";

/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath - The directory path to check or create.
 * @returns {Promise<void>}
 */
export async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await mkdir(dirPath, { recursive: true });
    Logger.info(`Directory ensured: ${dirPath}`);
  } catch (error) {
    const errorMsg = `Error ensuring directory ${dirPath}: ${error}`;
    Logger.error(errorMsg);
    throw new Error(errorMsg);
  }
}
