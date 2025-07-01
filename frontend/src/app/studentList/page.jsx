"use client";
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [error, setError] = useState(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchStudents = async () => {
    if (!eventName.trim()) {
      setError("Please enter an event name.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/events/${eventName}/students`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setStudents(response.data);
      setError(null);
      toast.success("Students fetched successfully!");
    } catch (error) {
      console.error("Error fetching students:", error.response?.data);
      setError("Failed to fetch students. Please check the event name.");
    }
  };

  return (
    <div className="w-full p-6 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4">Student List</h2>
          <p className="mb-4 text-gray-400">Enter the event name to fetch the list of registered students.</p>

          <input
            type="text"
            placeholder="Enter Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-3 bg-black/50 border border-white/10 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
          />

          <button
            onClick={fetchStudents}
            className="w-full mt-4 bg-white hover:bg-slate-200 text-black py-2 rounded-md transition"
          >
            Fetch Students
          </button>

          {error && <p className="mt-2 text-red-400">{error}</p>}

          {students.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Registered Students ({students.length})</h3>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.rollNo} className="flex items-center p-4 border border-white/10 rounded-lg bg-black/30 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={student.profilePhoto || "/default-profile.png"}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-lg text-white"><strong>{student.name}</strong></p>
                      <p className="text-gray-400">Roll No: {student.rollNo}</p>
                      <p className="text-gray-400">Email: {student.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <SidebarProvider className="bg-black min-h-screen flex">
      <AppSidebar />
      <SidebarInset className="w-full p-6">
        <StudentList />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
