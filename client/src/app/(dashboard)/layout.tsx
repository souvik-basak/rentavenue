"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenant" && pathname === "/")
      ) {
        router.push(
          "/managers/properties",
          { scroll: false }
        );
      }
    } else {
      setIsLoading(false);
    }
  }, [authUser, pathname, router]);

  if(authLoading || isLoading) return <>Loading...</>

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-primary-100 ">
        <Navbar />
        <div className="mt-10">
          <main className="flex">
            <Sidebar userType={authUser?.userRole.toLowerCase()} />
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
