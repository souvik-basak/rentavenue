import { usePathname } from "next/navigation";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  Building,
  DollarSignIcon,
  FileText,
  Heart,
  Home,
  Settings,
  SquareMenu,
  Trees,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const navLinks =
    userType === "manager"
      ? [
          { icon: Building, label: "Properties", href: "/managers/properties" },
          {
            icon: FileText,
            label: "Application",
            href: "/managers/applications",
          },
          { icon: Trees, label: "Tenants", href: "/managers/tenants" },
          {
            icon: DollarSignIcon,
            label: "Billing History",
            href: "/managers/billing",
          },
          {
            icon: Wallet,
            label: "Payment Methods",
            href: "/managers/payments",
          },
          { icon: Settings, label: "Settings", href: "/managers/settings" },
        ]
      : [
          { icon: Heart, label: "Favorites", href: "/tenants/favorites" },
          {
            icon: FileText,
            label: "Application",
            href: "/tenants/applications",
          },
          { icon: Home, label: "Residences", href: "/tenants/residents" },
          {
            icon: DollarSignIcon,
            label: "Billing History",
            href: "/tenants/billing",
          },
          { icon: Wallet, label: "Payment Methods", href: "/tenants/payments" },
          { icon: Settings, label: "Settings", href: "/tenants/settings" },
        ];

  return (
    <Sidebar
      collapsible="icon"
      className="fixed top-[70px] left-0 z-50 h-[calc(100vh - 80px)] w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex min-h-[56px] w-full items-center pt-3 mb-3",
                open ? "justify-between px-6" : "justify-center"
              )}
            >
              {open ? (
                <>
                  <h1 className="text-xl font-bold text-gray-900">
                    {userType === "manager"
                      ? "Manager Dashboard"
                      : "Tenant Dashboard"}
                  </h1>
                  <button
                    title="Close Sidebar"
                    className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                    onClick={() => toggleSidebar()}
                  >
                    <X className="h-8 w-8 text-gray-800" />
                  </button>
                </>
              ) : (
                <button
                  title="Open Sidebar"
                  className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                  onClick={() => toggleSidebar()}
                >
                  <SquareMenu className="h-8 w-8 text-gray-800" />
                </button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center px-7 py-7",
                    isActive ? "bg-gray-100" : "text-gray-600hover:bg-gray-100",
                    open ? "text-blue-600" : "ml-[5px]"
                  )}
                >
                  <Link href={link.href} className="w-full" scroll={false}>
                    <div className="flex items-center gap-4">
                      <link.icon
                        className={cn(
                          "h-6 w-6",
                          isActive ? "text-blue-600" : "text-gray-600"
                        )}
                      />
                      {open && (
                        <span
                          className={cn(
                            "text-base font-medium",
                            isActive ? "text-blue-600" : "text-gray-800"
                          )}
                        >
                          {link.label}
                        </span>
                      )}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
