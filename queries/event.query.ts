import { getClient } from "@/app/libs/graphql-client";
import { EVENT_TYPE } from "@/utils/types";
import { gql } from "graphql-request";

export const getAllEvents = async ({
  query,
  search,
}: {
  query: string;
  search?: string;
}) => {
  const client = getClient();

  const data: { events: { data: EVENT_TYPE[] } } = await client.request(
    gql`
      query AllEvents($search: String) {
        events: allEvents(search: $search) {
          data {
            ${query}
          }
        }
      }
    `,
    { query, search }
  );
  return data?.events || [];
};

export const getEventById = async (id: string, query: string) => {
  const client = getClient();
  const data: { event: EVENT_TYPE } = await client.request(
    gql`
      query EventById($id: ID!) {
        event: getEventById(id: $id) {
          ${query}
        }
      }
    `,
    { id, query }
  );
  return data?.event;
};
