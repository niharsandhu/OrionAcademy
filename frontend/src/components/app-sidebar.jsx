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
  const [user, setUser] = React.useState({ name: "", email: "", avatar: "/avatars/default.jpg" });

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isTeacherPage = ["/teacher", "/studentList", "/qrcode", "/uploadAttendance", "/createEvent"].some((path) =>
    pathname.endsWith(path)
  );

  const navMain = isTeacherPage
    ? [
        { title: "Student List", url: "studentList", icon: Users },
        { title: "QR Code", url: "qrcode", icon: QrCode },
        { title: "Upload Attendance", url: "uploadAttendance", icon: Upload },
        { title: "Create Event", url: "createEvent", icon: Calendar },
      ]
    : [
        {
          title: "Attendance",
          url: "attendance",
          icon: SquareTerminal,
          isActive: true,
          items: [
            { title: "History", url: "#" },
            { title: "Starred", url: "#" },
            { title: "Settings", url: "#" },
          ],
        },
        {
          title: "Events",
          url: "event",
          icon: BookOpen,
          items: [
            { title: "Introduction", url: "#" },
            { title: "Get Started", url: "#" },
            { title: "Tutorials", url: "#" },
            { title: "Changelog", url: "#" },
          ],
        },
      ];

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
