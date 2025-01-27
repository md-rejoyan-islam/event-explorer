import { getClient } from "@/app/libs/graphql-client";
import { gql } from "graphql-request";

export const getAllEvent = () => {
  const client = getClient();
  const data = client.request(gql``);

  return data;
};
