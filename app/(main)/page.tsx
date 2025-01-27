import Homepage from "@/components/home/homepage";
import { getAllEvents } from "@/queries/event.query";

export default async function Home() {
  const events = await getAllEvents({
    query: ` title, capacity, date, location, time, category, id, image `,
  });

  return <Homepage events={events} />;
}
