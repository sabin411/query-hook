import { type CLIArg as CLIArgType } from "@/types/options.type";

export const CLIArg = {
  FILE_NAME: "fileName",
  DIR_PATH: "dirPath",
  TEMPLATE_NAME: "template",
  TEMPLATE_PATH: "templatePath",
  SHOULD_REPLACE_FILE_NAME: "shouldReplaceFileName",
  FILE_NAME_TEXT_TO_BE_REPLACED: "fileNameTextToBeReplaced",
  SHOULD_REPLACE_FILE_CONTENT: "shouldReplaceFileContent",
  TEXT_TO_BE_REPLACED: "textToBeReplaced",
  REPLACE_TEXT_WITH: "replaceTextWith",
  SEARCH_AND_REPLACE_SEPARATOR: "searchAndReplaceSeparator",
  LIST: "list",
  LIST_DETAILED: "listDetailed",
  VERSION: "version",
  HELP: "help",
  CREATE_HOOK: "createHook",
} as const;

export const CLIArgAlias = {
  FILE_NAME: "n",
  TEMPLATE_NAME: "t",
  VERSION: "v",
  LIST: "l",
};

export const CLI_ARGS_TYPE = {
  "--fileName": String,
  "--dirPath": String,
  "--template": String,
  "--templatePath": String,
  "--shouldReplaceFileName": String,
  "--fileNameTextToBeReplaced": String,
  "--shouldReplaceFileContent": String,
  "--textToBeReplaced": String,
  "--replaceTextWith": String,
  "--searchAndReplaceSeparator": String,
  "--version": Boolean,
  "--help": Boolean,
  "--list": Boolean,
  "--listDetailed": Boolean,
  "--createHook": Boolean,

  // Aliases
  "-n": "--fileName",
  "-t": "--template",
  "-v": "--version",
  "-l": "--list",
  "-c": "--createHook",
};

export const BOOLEAN_CLI_ARGS: CLIArgType[] = [
  CLIArg.SHOULD_REPLACE_FILE_CONTENT,
  CLIArg.SHOULD_REPLACE_FILE_NAME,
];
