"use client";

import { EmployeeDetail } from "@/components/employee-detail";
import { AttendanceHistory } from "@/components/attendance-history";
import { AttendanceCalendar } from "@/components/reminders";
import AttendanceChart from "@/components/attendance-chart";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <SidebarProvider className="bg-black">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <SidebarInset>
        <div className="min-h-screen bg-black p-6 text-white">
          <div className="mx-auto max-w-9xl space-y-6">
            
            {/* Top Row: Student Detail & Attendance Chart */}
            <div className="flex flex-wrap gap-4 w-full">
              <div className="flex-1 min-w-[300px]">
                <EmployeeDetail />
              </div>
              <div className="flex-1 min-w-[300px]">
                <AttendanceChart />
              </div>
            </div>

            {/* Bottom Row: Attendance History & Attendance Calendar */}
            <div className="flex flex-wrap gap-6 w-full">
              <div className="flex-1 min-w-[300px]">
                <AttendanceHistory />
              </div>
              <div className="flex-1 min-w-[300px]">
                <AttendanceCalendar />
              </div>
            </div>

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
