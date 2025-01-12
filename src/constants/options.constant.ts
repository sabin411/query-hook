export const CLIArg = {
  VERSION: "version",
  HELP: "help",
  CREATE_HOOK: "createHook",
  HOOK_ONLY: "hookOnly",
} as const;

export const CLIArgAlias = {
  VERSION: "v",
  CREATE: "c",
  HOOK_ONLY: "h",
};

export const CLI_ARGS_TYPE = {
  "--version": Boolean,
  "--help": Boolean,
  "--createHook": Boolean,
  "--hookOnly": Boolean,

  // Aliases
  "-v": "--version",
  "-c": "--createHook",
  "-h": "--hookOnly",
};
