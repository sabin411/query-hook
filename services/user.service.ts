
import axios from "@/apis";
import { GetUserQueryResponse } from "@/types";

// NOTE: please do not forget to update params type to the actual type and use the params as required.
export const GetUser = async (params: Record<string, any>) => {
const { data } = await axios.get<GetUserQueryResponse>("/users/email");

return data;
};
