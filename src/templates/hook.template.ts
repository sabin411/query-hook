import { HookType } from "../types";
import { capitalize, kebabCase } from "../utils";

type GetHookTemplateArg = {
  hookConstName: string;
  responseTypeName: string;
  serviceConstName: string;
  hookType: HookType;
  ppName: string;
};

export const getHookTemplate = ({
  hookConstName,
  responseTypeName,
  serviceConstName,
  hookType,
  ppName,
}: GetHookTemplateArg) => {
  const capitalizedHookConstName = capitalize(hookConstName);
  const kebabCasedServiceConstName = kebabCase(serviceConstName);

  if (hookType === "query") {
    return `
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ${serviceConstName} } from "@/services";
import { ${responseTypeName}, ${ppName} } from "@/types";

type ${capitalizedHookConstName}Options<TData = ${responseTypeName}> = Omit<
  UseQueryOptions<${responseTypeName}, Error, TData>,
  "queryKey"
>;

type ${capitalizedHookConstName}Props<TData = ${responseTypeName}> = {
  params: ${ppName};
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
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ${serviceConstName} } from "@/services";
import { ${responseTypeName}, ${ppName} } from "@/types";

type ${capitalizedHookConstName}Options = Omit<
  UseMutationOptions<
    ${responseTypeName},
    Error,
    ${ppName},
  >,
  "mutateFn"
>;

export function ${hookConstName}({
  ...cb
}: ${capitalizedHookConstName}Options) {
  return useMutation<
    ${responseTypeName},
    Error,
    ${ppName}
  >({
    mutationFn: (payload: ${ppName}) =>
      ${serviceConstName}(payload),
    ...cb,
  });
}
  `;
};

// hook template for hook only options:
export const getHookOnlyTemplate = ({
  hookConstName,
  responseTypeName,
  serviceConstName,
  hookType,
}: GetHookTemplateArg) => {
  const capitalizedHookConstName = capitalize(hookConstName);
  const kebabCasedServiceConstName = kebabCase(serviceConstName);

  if (hookType === "query") {
    return `
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ${serviceConstName} } from "@/services";
import { ${responseTypeName} } from "@/types";

type ${capitalizedHookConstName}Options<TData = ${responseTypeName}> = Omit<
  UseQueryOptions<${responseTypeName}, Error, TData>,
  "queryKey"
>;

type ${capitalizedHookConstName}Props<TData = ${responseTypeName}> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any; // * Add your query params type here
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
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ${serviceConstName} } from "@/services";
import { ${responseTypeName} } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Payload = any; // * Add your payload type here 

type ${capitalizedHookConstName}Options = Omit<
  UseMutationOptions<
    ${responseTypeName},
    Error,
    Payload,
  >,
  "mutateFn"
>;

export function ${hookConstName}({
  ...cb
}: ${capitalizedHookConstName}Options) {
  return useMutation<
    ${responseTypeName},
    Error,
    Payload
  >({
    mutationFn: (payload: Payload) =>
      ${serviceConstName}(payload),
    ...cb,
  });
}
  `;
};
