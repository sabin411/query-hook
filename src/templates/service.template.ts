import { CliAnswers } from "../types";
import { innerTemplate } from "../utils";

export const getServiceTemplate = (
  answer: CliAnswers,
  responseTypeName: string,
  serviceConstName: string,
) => {
  const { service_url, service_method } = answer;

  if (service_method === "get") {
    return `
import axios from "@/apis";
import { ${responseTypeName}, QueryParams } from "@/types";

// ! NOTE: please do not forget to update params type to the actual type and use the params as required.
export const ${serviceConstName} = async (params: QueryParams) => {
const { id } = params;
const { data } = await axios.get<${responseTypeName}>(${innerTemplate(
      service_url,
    )});

return data;
};
`;
  }

  // All other methods except get
  return `
import axios from "@/apis";
import { ${responseTypeName}, Payload } from "@/types";


// please do not forget to change the payload type to the actual type
export const ${serviceConstName} = async (payload: Payload) => {
  try {
    const { data } = await axios.${service_method}<${responseTypeName}>(
      "${service_url}",
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
