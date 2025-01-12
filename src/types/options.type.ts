import { CLIArg } from "../constants";

export type CLIArg = (typeof CLIArg)[keyof typeof CLIArg];
export type RequestMethods = "get" | "post" | "put" | "delete";
export type HookType = "query" | "mutation";

export type CliAnswers = {
  hook_file_name: string;
  service_method: RequestMethods;
  service_file_name: string;
  typescript_file_name: string;
};

export type HookOnlyPromptAnswers = {
  hook_file_name: string;
  hook_type: HookType;
  service: string;
  response_type: string;
};
