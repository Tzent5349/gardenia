"use client";
import { getColorById } from "@/actions/get-colors";
import { getReviewOfProduct } from "@/actions/get-review";
import { Button } from "@/components/ui/button";
import { Cart } from "@/svg";
import { Product } from "@/types/page";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useUser } from "@clerk/nextjs";
import { addToWishList, getUserById } from "@/actions/get-user";
import toast from "react-hot-toast";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [productColors, setProductColors] = useState<
    { colorName: string; colorValue: string }[]
  >([]);
  const [rating, setRating] = useState(0);
  const { user } = useUser(); // Get the user object from Clerk
  const [isLoading, setIsLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchColors = async (colorId: string) => {
      try {
        const colors = await getColorById(colorId);
        return colors;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const fetchReview = async (productId: string) => {
      try {
        const review = await getReviewOfProduct(productId);
        const sumOfRatings = review.reduce(
          (total: number, review: any) => total + review.rating,
          0
        );
        const averageRating = sumOfRatings / review.length;
        setRating(averageRating);
      } catch (error) {
        console.error(error);
      }
    };

    const updateProduct = async () => {
      const updatedImgColorPrice = await Promise.all(
        product.ImgColorPrice.map(async (item: any) => {
          const colorDetail = await fetchColors(item.color);
          if (colorDetail) {
            return {
              colorName: colorDetail.name,
              colorValue: colorDetail.value,
            };
          }
          return null;
        })
      );
      setProductColors(
        updatedImgColorPrice.filter(Boolean) as {
          colorName: string;
          colorValue: string;
        }[]
      );
    };

    const checkUserFavourite = async () => {
      if (!product._id || !user?.publicMetadata.userId) return;
      try {
        const detailedUser = await getUserById(user.publicMetadata.userId as string);
        if (
          detailedUser.wishList &&
          detailedUser.wishList.includes(product._id)
        ) {
          setIsFavourite(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (product) {
      updateProduct();
      fetchReview(product._id);
    }
    if (user) {
      checkUserFavourite();
    }
  }, [product, user]);

  const addToWishlist = async () => {
    setIsFavourite(!isFavourite);
    try {
      setIsLoading(true);
      await addToWishList(user?.publicMetadata.userId as string, product._id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setIsLoading(false);
      toast.error("An error occurred while adding to wishlist. Please try again later.");
    } finally {
      toast.success(
        isFavourite
          ? "Product removed from wishlist"
          : "Product added to wishlist"
      );
    }
  };

  return (
    <Link
      href={`/product/${product._id}/`}
      className="my-4 items-stretch flex flex-col w-72 rounded-xl overflow-hidden hover:scale-105 hover:shadow-sm hover:shadow-violet-900"
      key={product._id}
    >
      <div className="p-4 bg-gradient-to-tr from-accent to-popover">
        <div className="imageContainer flex item-center justify-center w- h-72 rounded-xl overflow-hidden">
          <img
            src={product.img}
            alt={product.name}
            className="aspect-[] object-fill"
          />
        </div>
        <div className="detailsContainer flex flex-col mt-8">
          <div className="nameContainer">
            <h1 className="text- font-medium text-2xl"> 
              {product.name}
            </h1>
            <span>
              <Rating
                initialValue={rating}
                SVGstyle={{ display: "inline" }}
                allowFraction={true}
                transition={true}
                size={18}
                readonly={true}
              />
            </span>
          </div>
          <div className=""></div>
          <div className="price flex items-center gap-4 pt-4">
            <h1 className="text-lg font-light flex items-center gap-0.5">
              €{product.price}
            </h1>
            <h1 className="text-lg font-light flex items-center gap-0.5 line-through text-red-600">
              €{product.price + 20}
            </h1>
          </div>
          <div className="productAvailableColors flex items-center gap-4 pt-4">
            {productColors?.map((color: any, index: number) => (
              <div key={index} className="flex gap-2 items-center">
                <span
                  className="rounded-full w-5 h-5 border-2 border-secondary-foreground"
                  style={{ backgroundColor: color.colorValue }}
                >
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="addTocartButton flex items-center mt-4 gap-4">
          <Button
            type="button"
            className="flex w-full border rounded-2xl gap-4 bg-blue-500 font-semibold"
            onClick={addToWishlist}
          >
            <Cart /> Add to cart
          </Button>
          <Button
            type="button"
            className={`flex w-fit border rounded-xl ${isFavourite ? "hover:bg-red-600" : ""}`}
            onClick={addToWishlist}
          >
            <Heart className={isFavourite ? "fill-red-500 hover:fill-none" : ""} />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
