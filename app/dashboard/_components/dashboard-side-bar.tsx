"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import {
  Banknote,
  Folder,
  HomeIcon,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getIdentity, initAuthClient } from "../../../utils/icpAuthClient"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import router from "next/router";

export default function DashboardSideBar() {
  const [identity, setIdentity] = useState<string | null>(null);
  const pathname = usePathname();

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
    <div className="lg:block hidden border-r h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full bg-white dark:bg-gray-800">
          <Link
            className="flex items-center gap-2 font-semibold ml-1 text-gray-900 dark:text-gray-100"
            href="/"
          >
            <span>ChainAuth Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <NavItem
              href="/dashboard"
              icon={<HomeIcon className="h-4 w-4" />}
              label="Home"
              pathname={pathname}
            />
            <NavItem
              href="/dashboard/projects"
              icon={<Folder className="h-4 w-4" />}
              label="Projects"
              pathname={pathname}
            />
            <NavItem
              href="/dashboard/finance"
              icon={<Banknote className="h-4 w-4" />}
              label="Finance"
              pathname={pathname}
            />
            <NavItem
              href="/dashboard/reports"
              icon={<FileText className="h-4 w-4" />}
              label="Reports"
              pathname={pathname}
            />
            <Separator className="my-3" />
            <NavItem
              href="/dashboard/settings"
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
              pathname={pathname}
            />
          </nav>
        </div>
        <div className="flex items-center justify-center p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-500 transition-all hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
  pathname: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, pathname }) => (
  <Link
    className={clsx(
      "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
      {
        "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
          pathname === href,
      }
    )}
    href={href}
  >
    <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
      {icon}
    </div>
    {label}
  </Link>
);
