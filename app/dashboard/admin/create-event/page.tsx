import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateEvent() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <form className="space-y-4">
        <div>
          <Label htmlFor="name">Event Name</Label>
          <Input id="name" placeholder="Enter event name" />
        </div>
        <div>
          <Label htmlFor="date">Event Date</Label>
          <Input id="date" type="date" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter event description" />
        </div>
        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </form>
    </div>
  );
}
