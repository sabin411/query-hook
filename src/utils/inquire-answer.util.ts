import inquirer from "inquirer";
import { inquiryStaticText } from "../constants";

export const inquireAnswer = async () => {
  return await inquirer.prompt([
    {
      type: "input",
      name: "hook_file_name",
      message: inquiryStaticText["hook_name_msg"],
      default: "useGetUser.tsx",
      required: true,
      validate: (value) => {
        // hook_name should start with use and end with .tsx
        if (value.startsWith("use") && value.endsWith(".tsx")) {
          return true;
        }

        return inquiryStaticText["hook_name_validation_msg"];
      },
    },

    {
      type: "input",
      name: "service_file_name",
      message: inquiryStaticText["service_file_name_msg"],
      default: "user.service.ts",
      required: true,
      validate: (value) => {
        // service_file_name should end with .ts
        if (value.endsWith(".ts")) {
          return true;
        }

        return inquiryStaticText["service_file_name_validation_msg"];
      },
    },

    {
      type: "input",
      name: "typescript_file_name",
      message: inquiryStaticText["typescript_file_name_msg"],
      default: "user.type.ts",
      required: true,
      validate: (value) => {
        // typescript_file_name should end with .ts
        if (value.endsWith(".ts")) {
          return true;
        }

        return inquiryStaticText["typescript_file_name_validation_msg"];
      },
    },

    {
      type: "input",
      name: "protoType_file_name",
      message: inquiryStaticText["protoType_file_name_msg"],
      default: "user",
      required: true,
    },

    {
      type: "input",
      name: "response_type_name",
      message: inquiryStaticText["response_type_name_msg"],
      default: "SendInviteToUserResponse",
      required: true,
    },

    {
      type: "input",
      name: "service_url",
      message: inquiryStaticText["service_url_msg"],
      default: "/users/email",
    },

    {
      type: "list",
      name: "service_method",
      message: inquiryStaticText["service_method_msg"],
      default: "get",
      choices: ["get", "post", "put", "delete"],
    },
  ]);
};
