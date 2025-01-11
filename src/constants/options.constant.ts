export const CLIArg = {
  VERSION: "version",
  HELP: "help",
  CREATE_HOOK: "createHook",
} as const;

export const CLIArgAlias = {
  VERSION: "v",
  CREATE: "c",
  HELP: "h",
};

export const CLI_ARGS_TYPE = {
  "--version": Boolean,
  "--help": Boolean,
  "--createHook": Boolean,

  // Aliases
  "-v": "--version",
  "-c": "--createHook",
};
