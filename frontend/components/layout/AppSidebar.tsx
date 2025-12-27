"use client";

import {
  Home,
  Inbox,
  Bookmark,
  User,
  Settings,
  LogOut,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useAppContext } from "@/context/AppContext";

const items = [
  {
    title: "Career Page Jobs",
    url: "/dashboard/careerPageJobs",
    icon: Home,
  },
  {
    title: "Internshala Jobs",
    url: "/dashboard/internshalaJobs",
    icon: Inbox,
  },
  {
    title: "Bookmarked Jobs",
    url: "/dashboard/bookmarks",
    icon: Bookmark,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Edit Profile",
    url: "/dashboard/profile/edit",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { profile, logout } = useAppContext();
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl sm:text-3xl text-indigo-400 font-bold pt-5">JOBSCOUT AI</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="py-10">
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title} className="py-1">
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? "text-indigo-400 bg-indigo-400/10"
                          : "text-muted-foreground hover:text-indigo-400"
                      }
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User className="size-4" />
                  <span className="truncate">
                    {profile?.firstName || "User"}
                  </span>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="end"
                sideOffset={8}
                className="min-w-40"
              >

                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile/change-password">
                    <Settings className="mr-2 size-4" />
                    Change Password
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
