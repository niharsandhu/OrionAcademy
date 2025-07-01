"use client";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AttendanceCalendar } from "@/components/reminders";

export function AttendanceHistory() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch("http://localhost:3001/students/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch attendance");

        const data = await response.json();
        setAttendanceData(data.attendance || []);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    if (token) fetchAttendance();
  }, [token]);

  const getStatus = (percentage) => {
    if (percentage >= 90) return { label: "Excellent", color: "bg-green-400/10 text-green-400" };
    if (percentage >= 75) return { label: "Good", color: "bg-blue-400/10 text-blue-400" };
    if (percentage >= 50) return { label: "Warning", color: "bg-yellow-400/10 text-yellow-400" };
    return { label: "Critical", color: "bg-red-400/10 text-red-400" };
  };

  const calculateRequiredClasses = (attendanceArray) => {
    const totalClasses = attendanceArray.length;
    
    // Count both "Present" and "DutyLeave" as attended
    const attendedClasses = attendanceArray.filter((date) => 
      date.status === "Present" || date.status === "DutyLeave"
    ).length;
  
    const targetAttendance = 0.75; // Minimum required percentage (75%)
    let requiredClasses = 0;
  
    // Increase total classes until attendance reaches 75%
    while ((attendedClasses + requiredClasses) / (totalClasses + requiredClasses) < targetAttendance) {
      requiredClasses++;
    }
  
    return { totalClasses, attendedClasses, requiredClasses };
  };
  

  return (
    <div className="flex gap-4">
      {/* Attendance Cards */}
      <div className="w-[40vw]">
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-1xl font-semibold text-white">Attendance History</h2>
          </div>

          {/* Grid Wrapper to Prevent Overflow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {attendanceData.map((item, index) => {
              const { totalClasses, attendedClasses, requiredClasses } = calculateRequiredClasses(item.attendance);
              const attendancePercentage = item.attendancePercentage.toFixed(2);
              const { label, color } = getStatus(attendancePercentage);

              return (
                <Card
                key={index}
                className="bg-zinc-900 border-zinc-800 p-4 cursor-pointer hover:bg-zinc-700 w-full min-w-[11rem] flex flex-col justify-between"
                onClick={() => setSelectedCourse(item)}
              >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-zinc-400" />
                      <span className="text-white  text-sm">{item.courseName}</span>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs ${color}`}>{label}</span>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Current Attendance</p>
                    <p className="text-sm font-semibold text-emerald-400">{attendancePercentage}%</p>
                  </div>
                  {attendancePercentage < 75 && (
                    <div className="mt-2 text-sm text-yellow-400">
                      Attend <span className="font-bold">{requiredClasses}</span> more classes to reach 75%
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Fixed Space for Attendance Calendar */}
      <div className="w-[40vw]">
        {selectedCourse ? (
          <AttendanceCalendar course={selectedCourse} />
        ) : (
          <div className="h-full flex items-center justify-center bg-zinc-900 border-zinc-800 rounded-lg text-gray-400 p-6">
            Select a course 
          </div>
        )}
      </div>
    </div>
  );
}
