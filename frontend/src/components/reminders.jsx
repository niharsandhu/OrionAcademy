"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Utility for conditional classes

export function AttendanceCalendar({ course }) {
  if (!course) return null;

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    if (!course.attendance) return;

    const statusColors = {
      Present: "bg-green-500 text-white border-green-600",
      Absent: "bg-red-500 text-white border-red-600",
      DutyLeave: "bg-blue-500 text-white border-blue-600",
    };

    const mappedDates = {};
    course.attendance.forEach((entry) => {
      const formattedDate = entry.date.trim();
      mappedDates[formattedDate] = statusColors[entry.status] || "bg-gray-700 border-gray-600";
    });

    setMarkedDates(mappedDates);
  }, [course]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = getDaysInMonth(currentYear, currentMonth);

  const changeMonth = (direction) => {
    if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 p-6 w-full max-w-lg mx-auto shadow-2xl rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => changeMonth("prev")} className="text-white text-md font-medium  shadow-xl px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition">
          &lt;
        </button>
        <h2 className="text-1xl font-semibold text-white">
          {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
        </h2>
        <button onClick={() => changeMonth("next")} className="text-white text-md font-medium px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-gray-300 font-medium uppercase tracking-wide text-xs">
            {day}
          </div>
        ))}

        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="p-4"></div>
        ))}

        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const formattedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
          const colorClass = markedDates[formattedDate] || "bg-zinc-800 border-zinc-700 shadow-md";

          return (
            <div
              key={formattedDate}
              className={cn(
                "p-2 text-center  text-xs rounded-md cursor-pointer border font-semibold text-white transition",
                colorClass,
                "hover:scale-110 hover:shadow-md"
              )}
            >
              {day}
            </div>
          );
        })}
      </div>
    </Card>
  );
}