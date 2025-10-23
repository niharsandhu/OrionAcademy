"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Users,
  QrCode,
  Upload,
  Calendar,
  SquareTerminal,
  BookOpen,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }) {
  const pathname = usePathname();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    avatar: "/avatars/default.jpg",
  });

  // Safe localStorage access
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  // Determine if current page is for teacher
  const isTeacherPage = [
    "/teacher",
    "/studentList",
    "/qrcode",
    "/uploadAttendance",
    "/createEvent",
  ].some((path) => pathname.endsWith(path));

  // Navigation items
  const navMain = React.useMemo(() => {
    if (isTeacherPage) {
      return [
        { title: "Student List", url: "/studentList", icon: Users },
        { title: "QR Code", url: "/qrcode", icon: QrCode },
        { title: "Upload Attendance", url: "/uploadAttendance", icon: Upload },
        { title: "Create Event", url: "/createEvent", icon: Calendar },
      ];
    } else {
      return [
        {
          title: "Attendance",
          url: "/attendance",
          icon: SquareTerminal,
          isActive: pathname.startsWith("/attendance"),
          items: [
            { title: "History", url: "/attendance/history" },
            { title: "Starred", url: "/attendance/starred" },
            { title: "Settings", url: "/attendance/settings" },
          ],
        },
        {
          title: "Events",
          url: "/event",
          icon: BookOpen,
          items: [
            { title: "Introduction", url: "/event/introduction" },
            { title: "Get Started", url: "/event/get-started" },
            { title: "Tutorials", url: "/event/tutorials" },
            { title: "Changelog", url: "/event/changelog" },
          ],
        },
      ];
    }
  }, [isTeacherPage, pathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
