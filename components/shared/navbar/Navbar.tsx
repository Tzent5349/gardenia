import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

import { MainNav } from "@/components/shared/navbar/main-nav";
import { TopNavbar } from "@/components/shared/navbar/top-navbar";
import { RightNavbar } from "@/components/shared/navbar/right-navbar";
import { MobileMenu } from "@/components/shared/navbar/mobile-menu";

// This nedds to be dinamic

import BigLogo from "@/public/assets/logo/big.svg";
import SmallLogo from "@/public/assets/logo/small.svg";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const Navbar = async ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  /*     const {theme} = useTheme();
    const isThemeDark = theme === "dark"; */

  return (
    <div
      className={cn("border-b flex flex-col h-20 md:h-36  w-full items-center overflow-x-hidden  overflow-y-hidden", className)}
      {...props}
    >
      <div className="topNavbar border-b hidden md:flex items-center w-full px-8">
        <TopNavbar />
      </div>
      <div className="flex items-center flex-1 md:flex-wrap lg:flex-nowrap w-full py-6 md:py-2 px-8 md:px-16">
        <div className="imageContainer flex">
{/*           <Image
            src={SmallLogo}
            alt="gardenia Logo"
            width={60}
            height={60}
            className={cn("dark:invert flex md:hidden")}
          /> */}
          <Link href="/">
          <Image
            src={BigLogo}
            alt="gardenia Logo"
            width={240}
            height={120}
            className={cn("dark:invert")}
            />
            </Link>
        </div>

        <div className=" bigScreenMenu flex-1 items-center w-full hidden md:flex">
          <div className="flex h-16 items-center ml-auto mr-auto">
            <MainNav />
          </div>

          <div className="flex h-16 items-center ml-auto ">
            <RightNavbar />
          </div>
        </div>

        <div className="mobileMenu flex md:hidden gap-6 items-center ml-auto">
        <Button className="cart relative" variant={"link"}>
          <ShoppingCart className="w-6 h-6" />
          <Badge
            variant={"destructive"}
            className=" p-1 w-6 h-6 absolute -top-1 left-8"
          >
            10
          </Badge>
        </Button>
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
