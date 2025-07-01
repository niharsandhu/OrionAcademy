"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Calendar, MapPin, Clock } from "lucide-react";

const CreateEvent = () => {
  const [token, setToken] = useState(null);
  const [eventData, setEventData] = useState({
    name: "",
    venue: "",
    description: "",
    prize: "",
    organiserClub: "",
    date: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setMessage("Access denied: No token detected");
    }
  }, []);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("Access denied: No token detected");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/events/create",
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
      setEventData({ name: "", venue: "", description: "", prize: "", organiserClub: "", date: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating event");
    }
  };

  return (
    <div className="w-full p-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 p-6 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">Create Event</h2>
            {message && <p className="mb-4 text-red-500 font-medium">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "name", type: "text", placeholder: "Name" },
                { name: "venue", type: "text", placeholder: "Venue" },
                { name: "description", type: "text", placeholder: "Description" },
                { name: "prize", type: "text", placeholder: "Prize" },
                { name: "organiserClub", type: "text", placeholder: "Organiser Club" },
                { name: "date", type: "date", placeholder: "Date" }
              ].map((field) => (
                <div key={field.name} className="w-full">
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={eventData[field.name]}
                    onChange={handleChange}
                    className="w-full p-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    required
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-white hover:bg-slate-200 text-black py-2 rounded-lg font-semibold transition"
              >
                Create Event
              </button>
            </form>
          </div>
          <div className="md:col-span-2 space-y-6">
            <section className="p-6 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Event Preview</h3>
              <p className="mb-4 text-gray-400">Preview of your event details before submission.</p>
              <div className="space-y-2">
                {Object.entries(eventData).map(([key, value]) => (
                  <p key={key} className="text-gray-300">
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value || "N/A"}
                  </p>
                ))}
              </div>
            </section>
            <section className="p-6 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Tips for Creating an Event</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>Choose a catchy name for your event.</li>
                <li>Provide detailed descriptions to attract more participants.</li>
                <li>Ensure the venue is accessible and well-known.</li>
                <li>Set a date well in advance to allow participants to plan.</li>
              </ul>
            </section>
          </div>
        </div>
        <footer className="mt-6 text-center text-gray-500">
          <p>&copy; 2023 Orion Academy. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <SidebarProvider className="bg-black min-h-screen flex">
      <AppSidebar />
      <SidebarInset className="w-full p-6">
        <CreateEvent />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
