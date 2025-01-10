import { type Answers } from "inquirer";
import type { CLIArg } from "../types/options.type";
import arg = require("arg");
import { BOOLEAN_CLI_ARGS, CLI_ARGS_TYPE } from "@/constants/options.constant";
import { isBoolean } from "./validation.util";

/**
 * Extracts an argument
 * @param arg The argument name
 * @returns The argument value
 */
export const extractArg = (arg: CLIArg) => getArgs()[`--${arg}`];

const getArgs = (): Answers => {
  const args = Object.fromEntries(
    Object.entries(arg(CLI_ARGS_TYPE)).map(([key, value]) => [
      key,
      value === "true" ? true : value === "false" ? false : value,
    ])
  );

  BOOLEAN_CLI_ARGS.forEach((booleanArg) => {
    const argumentInBoolean = `--${booleanArg}`;

    if (args[argumentInBoolean] && !isBoolean(args[argumentInBoolean])) {
      throw new Error(
        `The expected value type for the '${arg}' is Boolean (true/false), but the provided value was ${args[argumentInBoolean]}`
      );
    }
  });

  return args;
};
