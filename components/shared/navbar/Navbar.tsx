"use client";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

import { MainNav } from "@/components/shared/navbar/main-nav";
import { TopNavbar } from "@/components/shared/navbar/top-navbar";
import { RightNavbar } from "@/components/shared/navbar/right-navbar";
import { MobileMenu } from "@/components/shared/navbar/mobile-menu";

// This nedds to be dinamic
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import BigLogo from "@/public/assets/logo/big.svg";
import SmallLogo from "@/public/assets/logo/small.svg";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { fetchUserWishList } from "@/lib/store/features/wishList/wishListSlice";
import { fetchUserShoppingCart } from "@/lib/store/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { LanguageToggle } from "@/components/language-toggle";

const Navbar = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  /*     const {theme} = useTheme();
    const isThemeDark = theme === "dark"; */

  const router = useRouter();
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);

  const cart = useAppSelector((state) => state.cart.items);
  const wishListCount = useAppSelector((state) => state.wishList.length);

  useEffect(() => {
    if (user && user.publicMetadata.userId) {
      dispatch(fetchUserWishList(user.publicMetadata.userId as string));
      dispatch(fetchUserShoppingCart(user.publicMetadata.userId as string));
    }
  }, [user, dispatch]);

  useEffect(() => {
    const calculateCartCount = () => {
      if (cart) {
        const totalItems = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartCount(totalItems);
      }
    };
    calculateCartCount();
    setWishCount(wishListCount);
  }, [cart, wishListCount]);

  const handleCheckout = () => {
    if (!user) {
      alert("Please log in to proceed to checkout.");
    } else {
      const userId = user.publicMetadata.userId;
      router.push(`/cart/${userId}`);
    }
  };

  return (
    <div
      className={cn(
        "border-b flex flex-col h-20 md:h-36  w-full items-center overflow-x-hidden  overflow-y-hidden",
        className
      )}
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
          <Button
            className="cart relative"
            variant={"link"}
            onClick={handleCheckout}
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <Badge
                variant={"destructive"}
                className="p-2 w-4 h-4 absolute -top-0.5 left-6 flex justify-center"
              >
                {cartCount}
              </Badge>
            )}
          </Button>

          <SignedIn>
            <div className="profileAvatar flex w-6">
              {/*           <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="rounded-full outline-none">
                <AvatarImage src={user?.imageUrl} alt={user?.firstName || "User"}  />
                <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user-profile"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>WishList</DropdownMenuItem>
              <DropdownMenuItem>Order History</DropdownMenuItem>
              <SignOutButton>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu> */}
              <Sheet>
                <SheetTrigger>
                  <Avatar className="rounded-full outline-none">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.firstName || "User"}
                    />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
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

                  <SheetFooter className="w-full flex flex-col mt-auto items-center justify-center">
                    <Button> Contact Us</Button>
                    <div className=" flex ">
                      <LanguageToggle />
                      <ThemeToggle />
                    </div>
                  </SheetFooter>
                  <SheetFooter className="">
                    <SheetClose>
                  <SignOutButton>
                  Log out
              </SignOutButton>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="profileAvatar flex">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Guest"
                      width={6}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"/sign-in"}>Log in</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SignedOut>

{/*           <MobileMenu /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
