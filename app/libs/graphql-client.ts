import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

export const getClient = () => {
  const client = new GraphQLClient(endpoint);

  return client;
};
