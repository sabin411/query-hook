import { CliAnswers } from "@/types";

export const getServiceTemplate = (
  answer: CliAnswers,
  responseTypeName: string,
  serviceConstName: string
) => {
  const { service_url, service_method } = answer;

  if (service_method === "get") {
    return `
import axios from "@/apis";
import { ${responseTypeName} } from "@/types";

// NOTE: please do not forget to update params type to the actual type and use the params as required.
export const ${serviceConstName} = async (params: Record<string, any>) => {
const { data } = await axios.get<${responseTypeName}>("${service_url}");

return data;
};
`;
  }

  // All other methods except get
  return `
import axios from "@/apis";
import { ${responseTypeName} } from "@/types";


// please do not forget to change the payload type to the actual type
export const ${serviceConstName} = async (payload: any) => {
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
