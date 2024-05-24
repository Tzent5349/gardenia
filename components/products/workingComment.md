"use client";
import React, { useEffect, useState } from "react";
import { getColorDetails } from "@/actions/get-colors";
import { getAllSizes, getSizeById } from "@/actions/get-sizes";
import { Button } from "../ui/button";
import { Heart, MoveUpRight, Truck } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "../ui/separator";
import { getCategoryDetailsById } from "@/actions/get-categories";
import SimilarProduct from "./SimilarProduct";
import { getGenderById } from "@/actions/get-gender";
import ToggleSize from "./ToggleSize";
import Loading from "./loading";
import { getReviewOfProduct } from "@/actions/get-review";
import { useUser } from "@clerk/nextjs";
import { Rating } from "react-simple-star-rating";
import { createReview } from "@/actions/create-review";

type ProductDetailProps = {
  product: any;
  similiarProducts: any;
};

const ProductDetails = ({ product, similiarProducts }: ProductDetailProps) => {
  const [nProduct, setNProduct] = useState<any>(); // Initialize as undefined
  const [index, setIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(""); // Add a state for the comment
  const { user } = useUser(); // Get the user object from Clerk

  useEffect(() => {
    const fetchColorDetails = async (colorId: string) => {
      try {
        const colorDetails = await getColorDetails(colorId);
        return colorDetails;
      } catch (error) {
        console.error("Error fetching color details:", error);
        return null;
      }
    };

    const fetchCategoryName = async () => {
      try {
        const categoryDetail = await getCategoryDetailsById(product.category);
        return categoryDetail?.name;
      } catch (error) {
        console.error("Error fetching category detail:", error);
        return null;
      }
    };

    const fetchGender = async () => {
      try {
        const genderDetail = await getGenderById(product.gender);
        return genderDetail?.name;
      } catch (error) {
        console.error("Error fetching gender:", error);
      }
    };

    const fetchAllSizes = async () => {
      try {
        const allSizes = await getAllSizes();
        return allSizes;
      } catch (error) {
        console.error("Error fetching Sizes:", error);
      }
    };

    const fetchReviews = async (productId: string) => {
      try {
        const reviews = await getReviewOfProduct(productId);
        return reviews;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const updateProduct = async () => {
      const updatedImgColorPrice = await Promise.all(
        product.ImgColorPrice.map(async (item: any) => {
          const colorDetail = await fetchColorDetails(item.color);
          const gender = await fetchGender();
          const allSizes = await fetchAllSizes();
          const GenderFilteredSizes = allSizes?.filter(
            (size) => size.gender === gender
          )[0].value;
          const productSize = item.sizeId;
          const matchedSizes = await GenderFilteredSizes?.filter((size) =>
            productSize.includes(size._id)
          );

          return {
            img: item.img,
            colorName: colorDetail?.name,
            colorValue: colorDetail?.value,
            id: colorDetail?._id,
            sizes: matchedSizes,
          };
        })
      );

      const gender = await fetchGender();
      const review = await fetchReviews(product._id);
      const updatedProduct = {
        ...product,
        ImgColorPrice: updatedImgColorPrice,
        gender: gender,
        reviews: review,
      };

      setNProduct(updatedProduct);
    };

    updateProduct();
  }, [product]);

  useEffect(() => {
    if (nProduct && nProduct.reviews) {
      const sumOfRatings = nProduct.reviews.reduce(
        (total: number, review: any) => total + review.rating,
        0
      );
      const averageRating = sumOfRatings / nProduct.reviews.length;
      setRating(averageRating);
    }
  }, [nProduct]);

  const handleColorButtonClick = (index: number) => {
    if (index !== selectedColorIndex) {
      setIndex(0);
    }
    setSelectedColorIndex(index);
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleReviewSubmit = async () => {
    try {
      const productId = nProduct._id;
      const reviewData = {
        userId: user?.id,
        productId,
        rating,
        comment,
      };
      await createReview(reviewData);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  if (!nProduct) {
    return <Loading />;
  }

  return (
    <section>
      <div className="productInfoWrapper flex flex-col w-full justify-center items-center h-full">
        <div className="productInfo flex w-5/6 md:w-5/6 lg:w-2/3 flex-col md:flex-row py-8 gap-8 h-full md:ml-0 lg:ml-24">
          <div className="LeftImageContainer flex flex-col w-full h-full items-end">
            {nProduct && (
              <div className="BigImageContainer flex flex-col gap-4">
                <img
                  src={nProduct.ImgColorPrice[selectedColorIndex].img[index].url}
                  alt=""
                  width={450}
                  height={100}
                  className="rounded-xl overflow-hidden h-[30rem]"
                />
                <div className="smallImagesContainer align-top flex gap-4">
                  {nProduct.ImgColorPrice[selectedColorIndex].img?.map(
                    (item: any, i: number) => (
                      <img
                        key={i}
                        src={item.url}
                        width={90}
                        className={
                          "rounded-xl overflow-hidden flex h-24 " +
                          (i === index ? "outline p-0.5" : "small-image")
                        }
                        onClick={() => setIndex(i)}
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="RightProductNameAndDetailContainer flex w-full h-full">
            <div className="productInfos flex flex-col w-full gap-4">
              <div className="nameContainer flex flex-col gap-2">
                <h1 className="font-semibold text-2xl">{product?.name}</h1>
                <Rating
                  onClick={handleRating}
                  initialValue={rating}
                  allowFraction={true}
                  transition={true}
                  size={24}
                />
                <div className="priceContainer">
                  <p className="font-medium text-lg">€{product?.price}</p>
                </div>
                <div className="productDescriptions">
                  <p>{product?.description}</p>
                </div>
              </div>
              <div className="productColorInfo flex gap-4 mt-2">
                {nProduct &&
                  nProduct.ImgColorPrice.map((item: any, index: number) => (
                    <button
                      key={item.id}
                      className={
                        "w-6 h-6 rounded-full" +
                        (selectedColorIndex === index
                          ? " w-6 h-6 outline outline-offset-2 overflow-hidden"
                          : "")
                      }
                      style={{ backgroundColor: item.colorValue }}
                      onClick={() => handleColorButtonClick(index)}
                    />
                  ))}
              </div>
              <div className="DeliveryInfo mt-4">
                <p className="flex items-center gap-2 text-sm">
                  <Truck className="w-4" />
                  Free shipping and 30 days return
                </p>
              </div>
              <div className="sizesInfo mt-4 flex flex-col items-start">
                {nProduct && (
                  <ToggleSize
                    availableSizes={
                      nProduct.ImgColorPrice[selectedColorIndex].sizes
                    }
                  />
                )}
                <Link href="" className="flex items-center gap-1">
                  <p className="text-sm text-slate-400">See guide</p>
                  <MoveUpRight className="w-3" />
                </Link>
              </div>
              <div className="accordion w-full mt-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Size & Fit</AccordionTrigger>
                    <AccordionContent>
                      <p>- Fits small; we recommend ordering a half size up</p>
                      <p>- Designed to last</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        - Free shipping all over the Portugal including Madeira
                        & Açores
                      </p>
                      <p>- Free, no hassle return</p>
                      <p>- Ships within 24 hours!</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="addTocartButton flex items-center mt-4 gap-4">
                <Button
                  type="button"
                  className="flex w-full border rounded-2xl gap-4 bg-blue-500 font-semibold"
                >
                  Add to cart
                </Button>
                <Button
                  type="button"
                  className="flex w-fit border rounded-xl hover:bg-red-600"
                >
                  <Heart />
                </Button>
              </div>
              <div className="mt-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a review..."
                  className="w-full border rounded p-2"
                />
                <Button onClick={handleReviewSubmit} className="mt-2">
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Separator className="mt-24 mb-10" />
        <div className="peopleAlsoLiked">
          <h1 className="text-2xl">People also liked:</h1>
          <SimilarProduct similarProduct={similiarProducts} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
