import { HookType } from "../types";
import { capitalize, kebabCase } from "../utils";

type GetHookTemplateArg = {
  hookConstName: string;
  responseTypeName: string;
  serviceConstName: string;
  serviceFileName: string;
  hookType: HookType;
};

export const getHookTemplate = ({
  hookConstName,
  responseTypeName,
  serviceConstName,
  serviceFileName,
  hookType,
}: GetHookTemplateArg) => {
  const capitalizedHookConstName = capitalize(hookConstName);
  const kebabCasedServiceConstName = kebabCase(serviceConstName);

  if (hookType === "query") {
    return `
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ${serviceConstName} } from "@/services/${serviceFileName}";
import { ${responseTypeName} } from "@/types";

type ${capitalizedHookConstName}Options<TData = ${responseTypeName}> = Omit<
  UseQueryOptions<${responseTypeName}, Error, TData>,
  "queryKey"
>;

type ${capitalizedHookConstName}Props<TData = ${responseTypeName}> = {
  params: Record<string, any>;
  queryKey?: QueryKey;
} & ${capitalizedHookConstName}Options<TData>;

export function ${hookConstName}<TData = ${responseTypeName}>({
  params,
  queryKey,
  ...cb
}: ${capitalizedHookConstName}Props<TData>) {
  // You can add or update the query key as needed 
  const keys: Array<unknown> = ["${kebabCasedServiceConstName}"];

  if (queryKey) {
    keys.push(...queryKey);
  }

  return useQuery({
    queryKey: keys,
    queryFn: () => ${serviceConstName}(params),
    ...cb,
  });
}
`;
  }

  return `
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ${serviceConstName} } from "@/services/${serviceFileName}";
import { ${responseTypeName} } from "@/types";

type ${capitalizedHookConstName}Options<TData = ${responseTypeName}> =
  Omit<
    UseQueryOptions<${responseTypeName}, Error, TData>,
    "queryKey"
  >;

type ${capitalizedHookConstName}Props<TData = ${responseTypeName}> = {
  payload: Record<string, any>;
  queryKey?: QueryKey;
} & ${capitalizedHookConstName}Options<TData>;

/**
 * Check if the organization exists in the database
 */
export function ${hookConstName}<
  TData = ${responseTypeName},
>({
  payload,
  queryKey,
  ...cb
}: ${capitalizedHookConstName}Props<TData>) {
  // You can add or update the query key as needed 
  const keys: Array<unknown> = ["${kebabCasedServiceConstName}"];

  if (queryKey) {
    keys.push(...queryKey);
  }

  return useQuery({
    queryKey: keys,
    queryFn: () => ${serviceConstName}(payload),
    ...cb,
  });
}

  `;
};
