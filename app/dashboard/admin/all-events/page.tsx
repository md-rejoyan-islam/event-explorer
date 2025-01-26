"use client";

import { EditEventModal } from "@/components/dashboard/edit-event-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "Tech Conference 2023",
      date: "2023-09-15",
      description: "Annual tech conference",
    },
    {
      id: 2,
      name: "Music Festival",
      date: "2023-10-01",
      description: "Three-day music festival",
    },
    {
      id: 3,
      name: "Food & Wine Expo",
      date: "2023-11-05",
      description: "Gourmet food and wine tasting event",
    },
  ]);

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {event.date}</p>
              <p className="mt-2">{event.description}</p>
              <div className="mt-4 space-x-2">
                <EditEventModal event={event} onSave={handleUpdateEvent} />
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
