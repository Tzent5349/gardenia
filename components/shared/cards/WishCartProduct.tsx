import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type WishCartProductProps = {
  product: any;
  userId: string;
  handleDeleteCartItem: (id: string) => void;
  handleDecreaseQuantity: (id: string) => void;
  handleIncreaseQuantity: (id: string) => void;
};

const WishCartProduct = ({
  product,
  userId,
  handleDeleteCartItem,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
}: WishCartProductProps) => {
  return (
    <div className="flex border-b pb-3 border-primary gap-12 flex-1 ">
      <div className="leftImageContainer">
        <Image
          src={product.img[0].url}
          alt={product.name}
          width={120}
          height={60}
          className="rounded-xl"
        />
      </div>
      <div className="rightDetailContainer flex w-full">
        <div className="left flex flex-col  justify-around ">
          <div className="upperNameContainer">
            <p className="text-xl text-start">{product.name}</p>
          </div>
          {product?.stock ? (
            <span className="text-sm text-green-500"> In Stock</span>
          ) : (
            <span className="text-sm text-amber-600"> Out of Stock</span>
          )}
          <div className="lowerIconContainer flex items-center gap-4">
            <Button
              className="group"
              type="button"
              variant={"ghost"}
              size={"sm"}
              onClick={() => handleDeleteCartItem(product.id)}
            >
              <Trash2 className="group-hover:text-rose-500" />
            </Button>
            <Button
              className="flex items-center gap-2 group"
              type="button"
              variant={"ghost"}
              size={"sm"}
            >
              <Heart className="group-hover:fill-rose-600" />
              Move to Wish List
            </Button>
          </div>
        </div>
        {product.quantity && (
          <div className="rightCorner flex ml-auto pr-10 flex-col justify-between">
            <div className="priceContainer w-full">
              <h1 className="text-xl font-semibold text-center">
                {product.price}
              </h1>
            </div>
            <div className="buttonContainer flex items-center gap-3">
              <Button
                variant={"ghost"}
                onClick={() => handleDecreaseQuantity(product.id)}
                disabled={product.quantity <= 1}
              >
                <Minus />
              </Button>
              <span className="px-4 py-2 border font-semibold bg-muted">
                {" "}
                {product.quantity}{" "}
              </span>
              <Button
                variant={"ghost"}
                onClick={() => handleIncreaseQuantity(product.id)}
              >
                <Plus />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishCartProduct;
