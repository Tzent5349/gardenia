"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
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
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { fetchUserWishList } from "@/lib/store/features/wishList/wishListSlice";
import { fetchUserShoppingCart } from "@/lib/store/features/cart/cartSlice";
import { useRouter } from "next/navigation";

export function RightNavbar() {
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
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
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
    <div className="flex items-center gap-4">
      <div className="searchProduct hidden md:flex items-center md:mr-6 lg:mr-12">
        <Input placeholder="Search your product here ..." className="w-64" />
        <Search className="-ml-8" />
      </div>

      <div className="shoppingFeatures flex items-center md:gap-2 lg:gap-6 md:mr-2 lg:mr-6">
        <Button size={"icon"} variant={"link"} className="wishlist relative">
          <Heart className="w-8 h-8" />
          {wishCount > 0 && (
            <Badge variant={"destructive"} className="p-2 w-4 h-4 absolute -top-0.5 left-6 flex justify-center">
              {wishCount}
            </Badge>
          )}
        </Button>

        <Button size={"icon"} variant={"link"} className="cart relative" onClick={handleCheckout}>
          <ShoppingCart className="w-7 h-7" />
          {cartCount > 0 && (
            <Badge variant={"destructive"} className="p-2 w-4 h-4 absolute -top-0.5 left-6 flex justify-center">
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
                <AvatarImage src={user?.imageUrl} alt={user?.firstName || "User"} />
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
                <Link href={"/sign-in"}>Log in</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SignedOut>
    </div>
  );
}
