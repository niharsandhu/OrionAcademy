"use client";

import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { QrCode, Users, Upload, Calendar } from "lucide-react";

export function NavMain({ items }) {

  const pathname = usePathname();
  const isTeacherPage = ["/teacher", "/studentList", "/qrcode","/uploadAttendance","createEvent"].some((path) =>
  pathname.endsWith(path)
);

  // Define sidebar items based on role
  const menuItems = isTeacherPage
    ? [
        { title: " Registered Students", url: "/studentList", icon: Users },
        { title: " Scan QR Code", url: "/qrcode", icon: QrCode },
        { title: "Upload Attendance", url: "/uploadAttendance", icon: Upload },
        { title: "Create Event", url: "/createEvent", icon: Calendar },
      ]
    : [
        { title: "Attendance", url: "/attendance", icon: null },
        { title: "Events", url: "/event", icon: null },
      ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-white">
        {isTeacherPage ? "Teacher Dashboard" : "Student Dashboard"}
      </SidebarGroupLabel>
      <SidebarMenu>
        {menuItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => (window.location.href = item.url)}
                >
                  {item.icon && <item.icon size={18} className="mr-2" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
