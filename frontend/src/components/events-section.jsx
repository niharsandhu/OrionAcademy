import { Calendar, MapPin, Clock } from "lucide-react";

export default function EventsSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-black text-white">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Upcoming Events</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay on course with these upcoming events and important dates
            </p>
          </div>
        </div>
        <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Annual Tech Symposium",
              date: "March 15, 2025",
              time: "9:00 AM",
              location: "Main Auditorium",
              description: "Join us for a day of innovation and technology",
            },
            {
              title: "Cultural Festival",
              date: "April 1, 2025",
              time: "10:00 AM",
              location: "College Ground",
              description: "Celebrate diversity through art, music and dance",
            },
            {
              title: "Career Fair 2025",
              date: "April 15, 2025",
              time: "11:00 AM",
              location: "Convention Center",
              description: "Meet top employers and explore opportunities",
            },
          ].map((event, index) => (
            <div
              key={index}
              className="flex flex-col p-6 space-y-4 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold">{event.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="text-gray-400">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}