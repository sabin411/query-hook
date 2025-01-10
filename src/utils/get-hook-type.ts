import { RequestMethods } from "@/types";

export const getHookType = (requestMethod: RequestMethods) => {
  if (requestMethod === "get") {
    return "query";
  }

  return "mutation";
};
