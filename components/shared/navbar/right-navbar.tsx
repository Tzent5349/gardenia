"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Heart, Search, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function RightNavbar() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const { user } = useUser();


  const handleCheckout = () => {
    if (!user) {
      alert("Please log in to proceed to checkout.");
    } else {
      // Proceed to checkout
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="searchProduct hidden md:flex items-center md:mr-6 lg:mr-12">
        <Input placeholder="Search your product here ..." className="w-64 " />
        <Search className="-ml-8" />
      </div>

      <div className="shoppingFeatures flex items-center md:gap-2 lg:gap-6 md:mr-2 lg:mr-6">
        <Button size={"icon"} variant={"link"} className="wishlist relative">
          <Heart className="w-8 h-8 " />
          {wishlistCount > 0 && (
            <Badge
              variant={"destructive"}
              className="p-1 w-6 h-6 absolute -top-1 left-8"
            >
              {wishlistCount}
            </Badge>
          )}
        </Button>

        <Button
          size={"icon"}
          variant={"link"}
          className="cart relative"
          onClick={handleCheckout}
        >
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <Badge
              variant={"destructive"}
              className="p-1 w-6 h-6 absolute -top-1 left-8"
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </div>

      <SignedIn>
        <div className="profileAvatar flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
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
          </DropdownMenu>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="profileAvatar flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Guest" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/sign-in"}> Log in</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SignedOut>
    </div>
  );
}
