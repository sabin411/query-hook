import { HookType } from "../types";
import { capitalize, kebabCase } from "../utils";

type GetHookTemplateArg = {
  hookConstName: string;
  responseTypeName: string;
  serviceConstName: string;
  hookType: HookType;
};

export const getHookTemplate = ({
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
import { ${responseTypeName}, QueryParams } from "@/types";

type ${capitalizedHookConstName}Options<TData = ${responseTypeName}> = Omit<
  UseQueryOptions<${responseTypeName}, Error, TData>,
  "queryKey"
>;

type ${capitalizedHookConstName}Props<TData = ${responseTypeName}> = {
  params: QueryParams;
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

import { ${serviceConstName} } from "@/services";
import { ${responseTypeName}, Payload } from "@/types";

type ${capitalizedHookConstName}Options<TData = ${responseTypeName}> =
  Omit<
    UseQueryOptions<${responseTypeName}, Error, TData>,
    "queryKey"
  >;

type ${capitalizedHookConstName}Props<TData = ${responseTypeName}> = {
  payload: Payload;
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
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ${serviceConstName} } from "@/services";
import { ${responseTypeName} } from "@/types";

type ${capitalizedHookConstName}Options<TData = ${responseTypeName}> =
  Omit<
    UseQueryOptions<${responseTypeName}, Error, TData>,
    "queryKey"
  >;

type ${capitalizedHookConstName}Props<TData = ${responseTypeName}> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any; // * Add your payload type here
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
