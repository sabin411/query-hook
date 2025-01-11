import * as Table from "cli-table3";

import { Logger } from "./logger.util";
import { CLIArg, CLIArgAlias } from "../constants";

export const writeHelpTable = () => {
  const table = new Table({
    head: ["Command", "Alias", "Description"],
    style: {
      head: new Array(3).fill("cyan"),
    },
  });

  let rows = [
    [CLIArg.HELP, "", "Show this help message"],
    [
      CLIArg.VERSION,
      CLIArgAlias.VERSION,
      "Show the current version of the package",
    ],
    [CLIArg.CREATE_HOOK, CLIArgAlias.CREATE, "Create a new hook"],
  ];

  rows = rows.map(([command, alias, ...rest]) => [
    `--${command}`,
    !!alias ? `-${alias}` : "",
    ...rest,
  ]);

  table.push(...rows);

  Logger.log(table.toString());
};
