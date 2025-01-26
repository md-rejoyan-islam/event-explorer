import EventDetails from "@/components/event/event-details";
import { getEventById } from "@/queries/event.query";

export default async function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
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

  return <EventDetails event={event} />;
}
