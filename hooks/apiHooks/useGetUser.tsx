
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import { GetUser } from "@/services/user.service.ts";
import { GetUserQueryResponse } from "@/types";

type UseGetUserOptions<TData = GetUserQueryResponse> = Omit<
  UseQueryOptions<GetUserQueryResponse, Error, TData>,
  "queryKey"
>;

type UseGetUserProps<TData = GetUserQueryResponse> = {
  params: Record<string, any>;
  queryKey?: QueryKey;
} & UseGetUserOptions<TData>;

export function useGetUser<TData = GetUserQueryResponse>({
  params,
  queryKey,
  ...cb
}: UseGetUserProps<TData>) {
  // You can add or update the query key as needed 
  const keys: Array<unknown> = ["get-user"];

  if (queryKey) {
    keys.push(...queryKey);
  }

  return useQuery({
    queryKey: keys,
    queryFn: () => GetUser(params),
    ...cb,
  });
}
