import { replaceApi } from "../constants";
import { CliAnswers } from "../types";

export const getServiceTemplate = (
  answer: CliAnswers,
  responseTypeName: string,
  serviceConstName: string,
  ppName: string,
) => {
  const { service_method } = answer;

  if (service_method === "get") {
    return `
import axios from "@/apis";
import { ${responseTypeName}, ${ppName} } from "@/types";

// ! NOTE: please do not forget to update params type to the actual type and use the params as required.
export const ${serviceConstName} = async (params: ${ppName}) => {
const { id } = params;
const { data } = await axios.get<${responseTypeName}>("/your-get-api-endpoint/here" + id); ${replaceApi}

return data;
};
`;
  }

  // All other methods except get
  return `
import axios from "@/apis";
import { ${responseTypeName}, ${ppName} } from "@/types";


// please do not forget to change the payload type to the actual type
export const ${serviceConstName} = async (payload: ${ppName}) => {
  try {
    const { data } = await axios.${service_method}<${responseTypeName}>(
      "/your-${service_method}-api-endpoint/here", ${replaceApi}
      payload
    );

    if (data.data.status) {
      return data;
    }

    throw new Error(data.data.message);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(err as string);
    throw error;
  }
};
  `;
};
