import { CliAnswers } from "../types";

export const getTsFileTemplate = (responseTypeName: string) => {
  return `
/* global API */

// TODO: Remove this type and use the actual type from the proto file you are working with.
type ProtoApiResponse = {}

export type ${responseTypeName} =
API.Response<ProtoApiResponse>; // * IMPORTANT: Please import and use type from the proto file you are working with.

// * Please don't forget to update this type name and actual type as per your requirement
export type QueryParams = {
  id: string;
};

// * Please don't forget to update this type name and actual type as per your requirement
export type Payload = {
};
`;
};
