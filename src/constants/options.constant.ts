export const CLIArg = {
  VERSION: "version",
  HELP: "help",
  CREATE_HOOK: "createHook",
  HOOK_ONLY: "hookOnly",
} as const;

export const CLIArgAlias = {
  VERSION: "v",
  CREATE: "c",
  HELP: "h",
  HOOK_ONLY: "ho",
};

export const CLI_ARGS_TYPE = {
  "--version": Boolean,
  "--help": Boolean,
  "--createHook": Boolean,
  "--hookOnly": Boolean,

  // Aliases
  "-v": "--version",
  "-c": "--createHook",
  "-ho": "--hookOnly",
};
