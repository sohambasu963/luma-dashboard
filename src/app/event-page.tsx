import { UserEvents } from "./types";
import Event from "@/components/event"
import { Button } from "@/components/ui/button";

interface EventPageProps {
  userEvents: UserEvents;
  onEventClick: any;
}

export default function EventPage({
  userEvents,
  onEventClick,
}: EventPageProps) {
  return (
    <div className="h-screen bg-cream flex flex-col items-center">
      <h1 className="mt-8 text-2xl">Luma Events</h1>
      <div className="grid grid-cols-3 gap-6 gap-x-12 mt-8">
        {userEvents &&
          userEvents.events.map((lumaEvent) => (
            <Button
                className="border p-8 rounded flex flex-col"
                disabled={!lumaEvent.role.is_manager}
                onClick={() => onEventClick(lumaEvent)}
                >
                <h1 className="text-lg font-bold">{lumaEvent.event.name}</h1>
                {lumaEvent.role.is_manager && <p className="text-xs text-left">Manage Access</p>}
            </Button>
          ))}
      </div>
    </div>
  );
}
