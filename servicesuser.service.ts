
import axios from "@/apis";
import { GetUserQueryResponse } from "@/types";

// NOTE: please do not forget to change the payload type to the actual type and insert into url if required
export const GetUser = async (params: Record<string, any>) => {
const { data } = await axios.get<GetUserQueryResponse>("/users/email");

return data;
};
