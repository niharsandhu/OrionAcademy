import { EmployeeDetail } from "@/components/employee-detail";
import { AttendanceHistory } from "@/components/attendance-history";
import { AttendanceCalendar } from "@/components/reminders";
import AttendanceChart from "@/components/attendance-chart";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider className="bg-black">
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-black p-6 text-white">
          <div className="mx-auto max-w-9xl space-y-6">
            {/* Top Row: Student Detail & Attendance Chart */}
            <div className="flex gap-4 w-full">
              <div className="flex-1">
                <EmployeeDetail />
              </div>
              <div className="flex-1">
                <AttendanceChart />
              </div>
            </div>

            {/* Bottom Row: Attendance History & Attendance Calendar */}
            <div className="flex gap-6 w-full">
              <div className="flex-1">
                <AttendanceHistory />
              </div>
              <div className="flex-1">
                <AttendanceCalendar />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

