import EventPage from "@/components/event/event-page";
import { getAllEvents } from "@/queries/event.query";

export default async function Events({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { search } = searchParams;
  const events = await getAllEvents({
    query: `
      title, capacity, date, location, time, category, id, image 
      `,
    search: (search || "") as string,
  });

  return <EventPage events={events} />;
}
