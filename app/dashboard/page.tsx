"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BarChartComponent } from "./_components/bar-chart";
import { BarChartBetter } from "./_components/bar-chart-better";
import { useEffect, useState } from "react";
import { getIdentity, initAuthClient } from "../../utils/icpAuthClient"; // Adjust the path as needed
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Dashboard() {
  const [identity, setIdentity] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchIdentity = async () => {
      const userIdentity = await getIdentity();
      setIdentity(userIdentity);
    };

    fetchIdentity();
  }, []);

  const handleLogout = async () => {
    const client = await initAuthClient();
    await client.logout(); // Call logout method on the AuthClient
    router.push("/"); // Redirect to the home page after logging out
  };


  return (
    <div className="flex flex-col justify-center items-start flex-wrap px-4 pt-4 gap-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Welcome to ChainAuth Dashboard
      </h1>

      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center">
        {identity ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Your Identity
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{identity}</p>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Loading your identity...
          </p>
        )}
      </div>

      <Card className="w-[20rem] bg-gray-50 dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
            ChainAuth
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">100</div>
          <p className="text-xs text-muted-foreground">Active Users</p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <BarChartComponent />
        <BarChartBetter />
      </div>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full gap-3">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Latest Projects</CardTitle>
              <CardDescription>
                Recent projects created with ChainAuth
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/dashboard/projects">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div style={{ maxHeight: "320px", overflowY: "auto" }}>
              <main className="flex flex-col gap-2 lg:gap-2 h-[300px] w-full">
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-xl font-bold tracking-tight">
                      You have no projects
                    </h1>
                    <p className="text-sm text-muted-foreground mb-3">
                      Start creating projects to see them listed here.
                    </p>
                  </div>
                </div>
              </main>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logout Button */}
      <Button onClick={handleLogout} className="mt-4">
        Logout
      </Button>
    </div>
  );
}
