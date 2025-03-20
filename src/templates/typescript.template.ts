import { CliAnswers, HookType } from "../types";
import { capitalize } from "../utils";

export const getTsFileTemplate = (
  responseTypeName: string,
  hookType: HookType,
  ppName: string,
) => {
  return `
/* global API */

// TODO: Remove this type and use the actual type from the proto file you are working with.
type ProtoApiResponse = {}

export type ${responseTypeName} =
API.Response<ProtoApiResponse>; // * IMPORTANT: Please import and use type from the proto file you are working with.

${
  hookType === "query"
    ? `
// * Please don't forget to update this type name and actual type as per your requirement
export type ${ppName} = {
  id: string;
};
`
    : `
// * Please don't forget to update this type name and actual type as per your requirement
export type ${ppName} = {
};
`
}
`;
};
