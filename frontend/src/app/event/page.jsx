import { AppSidebar } from "@/components/app-sidebar";
import  {EventReminders}  from "@/components/reminder-event";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";


export default function Page() {
  return (
    <SidebarProvider className="bg-black">
      <AppSidebar />
      <SidebarInset>
        <EventReminders />
      </SidebarInset>
    </SidebarProvider>
  );
}