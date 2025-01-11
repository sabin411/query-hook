import { CLIArg } from "../constants";

export type CLIArg = (typeof CLIArg)[keyof typeof CLIArg];
export type RequestMethods = "get" | "post" | "put" | "delete";
export type HookType = "query" | "mutation";

export type CliAnswers = {
  hook_file_name: string;
  service_url: string;
  service_method: RequestMethods;
  service_file_name: string;
  typescript_file_name: string;
  protoType_file_name: string;
  response_type_name: string;
};
