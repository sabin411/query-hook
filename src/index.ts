#!/usr/bin/env node

import { CLIArg, initialLog } from "./constants";
import { createHook } from "./executables/create-hook.executable";
import { inquireAnswer } from "./utils";
import { extractArg } from "./utils/args.util";
import { writeHelpTable } from "./utils/help.util";
import { Logger, overrideLogger } from "./utils/logger.util";

const run = async () => {
  overrideLogger();

  try {
    if (extractArg(CLIArg.VERSION)) {
      const packageJson = await require("../package.json");
      Logger.log(packageJson.version);

      return;
    }

    if (extractArg(CLIArg.HELP)) {
      writeHelpTable();
      return;
    }

    if (extractArg(CLIArg.CREATE_HOOK)) {
      Logger.warning(initialLog);
      const answers = await inquireAnswer();

      createHook(answers);

      return;
    }
  } catch (e) {
    Logger.error(e);
  }
};

run();
