import { getClient } from "@/app/libs/graphql-client";
import { ENROLLED_EVENT } from "@/utils/types";
import { gql } from "graphql-request";

export const enrolledAnEvent = async (eventId: string, userId: string) => {
  const client = getClient();
  const data: { enrolled: ENROLLED_EVENT } = await client.request(
    gql`
      mutation EnrollEvent($eventId: ID!, $userId: ID!) {
        enrolled: enrollEvent(eventId: $eventId, userId: $userId) {
          eventId
          event {
            capacity
          }
        }
      }
    `,
    { eventId, userId }
  );
  return data?.enrolled;
};
