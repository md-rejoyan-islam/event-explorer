import EventPage from "@/components/event/event-page";
import { getAllEvents, getAllEventsCategories } from "@/queries/event.query";

export default async function Events({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { search, category } = searchParams;

  const events = await getAllEvents({
    query: `
      title, capacity, date, location, time, category, id, image 
      `,
    search: (search || "") as string,
    category: (category || "") as string,
  });

  const categories = await getAllEventsCategories();

  return <EventPage events={events} categories={categories} />;
}
