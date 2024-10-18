"use client";

import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Banknote, Folder, HomeIcon, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getIdentity, initAuthClient } from "../../../utils/icpAuthClient"; // Adjust the path as needed

export default function DashboardTopNav({ children }: { children: ReactNode }) {
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
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3 bg-white dark:bg-gray-800">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <HamburgerMenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-50 dark:bg-gray-900">
            <SheetHeader>
              <Link href="/">
                <SheetTitle className="text-gray-900 dark:text-gray-100">
                  ChainAuth
                </SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/projects">
                  <Button variant="outline" className="w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    Projects
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/social-media">
                  <Button variant="outline" className="w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    Social Media
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/ecommerce">
                  <Button variant="outline" className="w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    Ecommerce
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/healthcare">
                  <Button variant="outline" className="w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    Healthcare
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/real-estate">
                  <Button variant="outline" className="w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    Real estate
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/finance">
                  <Button variant="outline" className="w-full">
                    <Banknote className="mr-2 h-4 w-4" />
                    Finance
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/reports">
                  <Button variant="outline" className="w-full">
                    <Banknote className="mr-2 h-4 w-4" />
                    Reports
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/constent">
                  <Button variant="outline" className="w-full">
                    <Banknote className="mr-2 h-4 w-4" />
                    Constent
                  </Button>
                </Link>
              </DialogClose>
              <Separator className="my-3" />
              <DialogClose asChild>
                <Link href="/dashboard/settings">
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex justify-center items-center gap-2 ml-auto">
          <ModeToggle />
        </div>
      </header>
      {children}
    </div>
  );
}
