"use client";
import { getUserById } from "@/actions/get-user";
import CartLis from "@/components/cart/Cart";
import React, { useEffect, useState } from "react";

type cartProps = {
  params: {
    userId: string;
  };
};

const Cart = ({ params: { userId } }: cartProps) => {
  const [userCartList, setUserCartList] = useState<any[]>([]);

  useEffect(() => {
    const getUserCart = async () => {
      try {
        const user = await getUserById(userId);
        setUserCartList(user.cartHolder);
        return user;
      } catch (error) {
        console.log(error);
      }
    };

    getUserCart();
  }, [userId]);

/*   console.log(userCartList); */

  return (
    <div>
      <CartLis userCartList={userCartList} />
    </div>
  );
};

export default Cart;
