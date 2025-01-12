import { HookOnlyPromptAnswers } from "../types";
import { createFile } from "./create-file.executable";
import { getHookTemplate } from "../templates/hook.template";
import { ensureDirectory } from "./ensure-directory.executable";
import { Logger } from "../utils";

const path = require("path");

/**
 * Main function to create a hook based on user inputs.
 * There might be a case where the user wants to create a hook only without the service and typescript files.
 * @param {HookOnlyPromptAnswers} answers - User-provided CLI answers.
 * @returns {Promise<void>}
 */
export async function createHookOnly(answers: HookOnlyPromptAnswers) {
  try {
    const currentDir = process.cwd();
    const configs = require(path.join(currentDir, "hookApi.json"));

    // Extract paths from configuration
    const { hook } = configs.exportPath;
    const hookPath = path.join(currentDir, hook);

    // ensure required directories exist
    await ensureDirectory(hookPath);

    // Generate hook file
    await createFile(
      path.join(hookPath, answers.hook_file_name),
      getHookTemplate({
        hookConstName: answers.hook_file_name.replace(".tsx", ""),
        hookType: answers.hook_type,
        responseTypeName: answers.response_type,
        serviceConstName: answers.service,
      }),
      answers.hook_file_name,
    );

    Logger.success(
      `🎉 Created ${answers.hook_file_name} ${answers.hook_type} hook successfully!`,
    );
  } catch (error) {
    Logger.error(`❌ Error in createHookOnly function: ${error}`);
    throw error;
  }
}
