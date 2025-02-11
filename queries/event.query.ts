import { getClient } from "@/app/libs/graphql-client";
import { EVENT_TYPE } from "@/utils/types";
import { gql } from "graphql-request";

export const getAllEvents = async ({
  query,
  search,
  category,
}: {
  query: string;
  search?: string;
  category?: string;
}) => {
  const client = getClient();

  const data: { events: { data: EVENT_TYPE[] } } = await client.request(
    gql`
      query AllEvents($search: String, $category: String) {
        events: allEvents(search: $search, category: $category) {
          data {
            ${query}
          }
        }
      }
    `,
    { query, search, category }
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

export const getAllEventsCategories = async () => {
  const client = getClient();
  const data: { categories: { data: string[] } } = await client.request(
    gql`
      query AllEventsCategories {
        categories: allEventsCategory {
          data
        }
      }
    `
  );
  return data?.categories?.data || [];
};
