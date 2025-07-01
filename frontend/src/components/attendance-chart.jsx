"use client";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = localStorage.getItem("token");
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

    fetchAttendance();
  }, []);

  // Normalize data for the chart
  const normalizeAttendance = (data) => {
    if (!data || data.length === 0) return [];

    const maxAttendance = Math.max(...data.map((item) => item.attendancePercentage));

    return data.map((item, index) => ({
      course: item.courseName,
      attendance: maxAttendance ? Math.round((item.attendancePercentage / maxAttendance) * 100) : 0,
      fill: ["#34D399", "#FACC15", "#F97316", "#EF4444", "#6366F1"][index % 5], // Assign different colors
    }));
  };

  const chartData = normalizeAttendance(attendanceData);

  return (
    <Card className="flex flex-col bg-zinc-900 border-zinc-800 shadow-lg rounded-2xl">
      <CardHeader className="flex flex-col items-center pb-4">
        <CardTitle className="text-md text-white font-semibold tracking-wide">Attendance Overview</CardTitle>
        <CardDescription className="text-zinc-400">January - June 2025</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center items-center py-2">
        {chartData.length > 0 ? (
          <ChartContainer className="mx-auto aspect-square min-w-[220px] min-h-[220px]">
            <RadialBarChart
              width={260}
              height={260}
              data={chartData}
              startAngle={-90}
              endAngle={270}
              innerRadius={35}
              outerRadius={120}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="course" />}
              />
              <RadialBar dataKey="attendance" background>
                <LabelList
                  position="insideStart"
                  dataKey="course"
                  className="fill-white capitalize mix-blend-luminosity"
                  fontSize={12}
                />
              </RadialBar>
            </RadialBarChart>
          </ChartContainer>
        ) : (
          <p className="text-center text-zinc-400">No attendance data available.</p>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2 px-5 py-3 border-t border-zinc-800">
        <div className="flex items-center gap-2 text-white font-medium text-sm">
          Course Attendance Trend <TrendingUp className="h-3 w-3 text-emerald-400" />
        </div>
        <p className="text-zinc-400 text-sm">
          Showing the overall attendance record of student across different courses.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AttendanceChart;
