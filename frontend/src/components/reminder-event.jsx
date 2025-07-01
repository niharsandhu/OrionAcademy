"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function EventReminders() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/events/getEvents");
        console.log("Fetched Events:", response.data);
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          toast.error("Invalid event data received");
        }
      } catch (error) {
        toast.error("Failed to fetch events");
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventName) => {
    console.log("Register clicked for:", eventName);
    setLoading(eventName);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to register");
        setLoading(null);
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/events/register",
        { eventName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Full error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Registration failed");
    }
    setLoading(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-1xl font-bold mb-4 text-white flex items-center gap-2">
        <CalendarDays className="w-5 h-5 text-emerald-400" /> Upcoming Events
      </h2>

      {events.length === 0 ? (
        <p className="text-zinc-400">No upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="bg-zinc-900 border border-zinc-800 shadow-lg rounded-2xl transition hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg font-semibold">{event.name}</CardTitle>
                <CardDescription className="text-zinc-400">{event.club} | {event.venue}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm text-zinc-300"><strong>Description:</strong> {event.description}</p>
                <p className="text-sm text-emerald-400 font-medium"><strong>Prize:</strong> {event.prize}</p>
                <p className="text-sm text-zinc-300"><strong>Organizer:</strong> {event.organiser.name}</p>
              </CardContent>

              <CardFooter className="border-t border-zinc-800 px-4 py-3">
                <button
                  onClick={() => handleRegister(event.name)}
                  disabled={loading === event.name}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg transition hover:bg-emerald-700 disabled:bg-zinc-700 disabled:cursor-not-allowed"
                >
                  {loading === event.name ? "Registering..." : "Register"}
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
