import { CLIArg } from "./constants";
import { createHook } from "./executables/create-hook.executable";
import { extractArg } from "./utils/args.util";
import { writeHelpTable } from "./utils/help.util";
import { Logger, overrideLogger } from "./utils/logger.util";
import { isBoolean } from "./utils/validation.util";

console.log(Logger.success(isBoolean("sabin")), CLIArg);
console.log(writeHelpTable());

import inquirer from "inquirer";

const run = async () => {
  overrideLogger();

  try {
    if (extractArg(CLIArg.VERSION)) {
      const packageJson = await require("../package.json");
      Logger.log(packageJson.default);

      return;
    }

    if (extractArg(CLIArg.HELP)) {
      writeHelpTable();
      return;
    }

    if (extractArg(CLIArg.CREATE_HOOK)) {
      Logger.log("Creating hook...");

      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "hook_name",
          message: "Enter the name of api hook file:",
          default: "useGetUser.tsx",
          required: true,
          validate: (value) => {
            // hook_name should start with use and end with .tsx
            if (value.startsWith("use") && value.endsWith(".tsx")) {
              return true;
            }

            return "Hook name should start with 'use' and should have '.tsx' extension";
          },
        },

        {
          type: "input",
          name: "service_file_name",
          message: "Enter the service name:",
          default: "user.service.ts",
          required: true,
          validate: (value) => {
            // service_file_name should end with .ts
            if (value.endsWith(".ts")) {
              return true;
            }

            return "Service file should be a typescript file hence should have .ts extension";
          },
        },

        {
          type: "input",
          name: "typescript_file_name",
          message: "Enter the typescript file name for better typecast:",
          default: "user.type.ts",
          required: true,
          validate: (value) => {
            // typescript_file_name should end with .ts
            if (value.endsWith(".ts")) {
              return true;
            }

            return "Typescript file should be a typescript file hence should have .ts extension";
          },
        },

        {
          type: "input",
          name: "protoType_file_name",
          message:
            "Please enter the proto-type file name from where you want to import response type:",
          default: "user",
          required: true,
        },

        {
          type: "input",
          name: "response_type_name",
          message:
            "Please enter the response type you want to import from proto-type file (you selected above):",
          default: "SendInviteToUserResponse",
          required: true,
        },

        {
          type: "input",
          name: "service_url",
          message: "Enter the url for the service:",
          default: "/users/email",
        },

        {
          type: "list",
          name: "service_method",
          message: "Enter the method for the service:",
          default: "get",
          choices: ["get", "post", "put", "delete"],
        },
      ]);

      createHook(answers);

      return;
    }
  } catch (e) {
    Logger.error(e);
  }
};

run();

console.log({ sabin: "sabin" });
