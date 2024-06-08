
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

import BigLogo from "@/public/assets/logo/big.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

import { Button } from "@/components/ui/button";




export function MobileMenu() {


  return (
    <div className="z-50">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent className="flex items-center flex-col justify-center">
          <SheetHeader>
            <SheetTitle className="flex flex-col justify-center"></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className=" flex flex-col items-center w-full justify-center ">
            <div className="logoContainer border-b w-full pb-4 justify-center flex">
              <Image
                src={BigLogo}
                alt="gardenia Logo"
                width={240}
                height={120}
                className={cn("dark:invert ")}
              />
            </div>
            <div className="menu mt-10 flex flex-col gap-6  items-start">
              <SheetClose asChild>
                <Link href="/" className="text-md font-semibold">
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/ad" className="text-md font-semibold">
                  Brand
                </Link>
              </SheetClose>{" "}
              <SheetClose asChild>
                <Link href="/a" className="text-md font-semibold">
                  Categories
                </Link>
              </SheetClose>
          <div className="profile mt-20 flex flex-col gap-6  items-start">
            <SheetClose asChild>
              <Link href="" className="text-md font-semibold">
                <p>Wish List</p>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="" className="text-md font-semibold">
                <p>Shopping Cart</p>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="" className="text-md font-semibold">
                <p>Profile</p>
              </Link>
            </SheetClose>
          </div>
            </div>
          </div>
          {/*             <Separator className="my-4" /> */}


          <SheetFooter className=""></SheetFooter>
          <SheetFooter className="w-full flex flex-col mt-auto items-center justify-center">
            <Button> Contact Us</Button>
            <div className=" flex ">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
