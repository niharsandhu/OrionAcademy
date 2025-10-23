"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

export function EmployeeDetail() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Run only on the client
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login.");
      setLoading(false);
      return;
    }

    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/students/details", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setStudent(response.data);
      } catch (err) {
        console.error("Error fetching student details:", err.message);
        setError("Failed to fetch student details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  if (loading) {
    return (
      <Card className="bg-zinc-900 border-zinc-800 p-6 text-white">
        Loading...
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-900 border-red-800 p-6 text-white">
        {error}
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Student Details</h1>
      </div>

      {/* Profile Section */}
      <div className="mb-8 flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={student.profilePhoto || "/fallback.png"} alt={student.name} />
          <AvatarFallback>{student.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="space-y-6 w-full">
          <h2 className="text-xl font-semibold text-white">{student.name}</h2>

          <div className="grid grid-cols-3 gap-4 w-full">
            {[
              { label: "Roll No", value: student.rollNo },
              { label: "Group", value: student.group },
              { label: "Year", value: student.year },
              { label: "Branch", value: student.branch },
            ].map((item, index) => (
              <Card key={index} className="bg-zinc-900 border-zinc-800 p-3">
                <p className="text-sm text-zinc-400">{item.label}</p>
                <p className="text-emerald-400 text-sm">{item.value}</p>
              </Card>
            ))}

            <Card className="bg-zinc-900 border-zinc-800 p-3 col-span-2">
              <p className="text-sm text-zinc-400">Email Address</p>
              <p className="text-emerald-400 overflow-hidden text-ellipsis whitespace-nowrap">
                {student.email}
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Mentor Section */}
      <Card className="bg-zinc-900 border-zinc-800 p-3">
        <p className="text-sm text-zinc-400">Mentor Name</p>
        <p className="text-emerald-400">{student.mentorName}</p>
      </Card>
    </Card>
  );
}
