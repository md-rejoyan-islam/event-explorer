import EventDetails from "@/components/event/event-details";
import { auth } from "@/lib/auth";
import { getEventById } from "@/queries/event.query";
import { SessionType } from "@/utils/types";

export default async function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = (await auth()) as unknown as SessionType;

  const event = await getEventById(
    params.id,
    `
    title, date, time, location, category, capacity, price, image , organizer {
      name, email
    }
    `
  );

  if (!event) {
    return <div>Event not found</div>;
  }

  return <EventDetails event={event} session={session} />;
}
