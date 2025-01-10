import { CliAnswers } from "@/types";

export const getTsFileTemplate = (
  answer: CliAnswers,
  responseTypeName: string
) => {
  const { response_type_name, protoType_file_name } = answer;

  return `
  /* global API */
  import { ${response_type_name} } from "@/proto-types/${protoType_file_name}";

  export type ${responseTypeName} =
  API.Response<${response_type_name}>;
  `;
};
