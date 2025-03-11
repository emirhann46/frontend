import { EventList } from "@/app/components/events/event-list";
import { EventFilters } from "@/app/components/events/event-filters";

export default function EventsPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <EventFilters />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-6">Etkinlikler</h1>
            <EventList />
          </div>
        </div>
      </div>
    </div>
  );
} 