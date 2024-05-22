"use client";
import React, { Suspense, useEffect, useState } from "react";
import { getColorDetails } from "@/actions/get-colors";
import {
  getAllSizes,
  getSizeById /* getAllSizesByGenderId */,
} from "@/actions/get-sizes";
import { Button } from "../ui/button";
import { Heart, MoveUpRight, Star, StarHalf, Truck } from "lucide-react";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Cart } from "@/svg";
import { getCategoryDetailsById } from "@/actions/get-categories";
import SimilarProduct from "./SimilarProduct";
import { Separator } from "../ui/separator";
import { getGenderById } from "@/actions/get-gender";
import ToggleSize from "./ToggleSize";
import ProductSkeleton from "./loading";
import Image from "next/image";

type ProductDetailProps = {
  product: any;
  similiarProducts: any;
};

const ProductDetails = ({ product, similiarProducts }: ProductDetailProps) => {
  const [nProduct, setNProduct] = useState<any>(); // Initialize as undefined

  const [index, setIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  /*   const [availableSize, setAvailableSize] = useState(); */
/*   const [availableSize, setAvailableSize] = useState<
    | { _id: string; footLength: string; EU: string; UK: string; US: string }[]
    | undefined
  >([]); */

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
        console.error("Error fetching SIzes:", error);
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
          const matchedSizes:
            | {
                _id: string;
                footLength: string;
                EU: string;
                UK: string;
                US: string;
              }[]
            | undefined = await GenderFilteredSizes?.filter((size) =>
            productSize.includes(size._id)
          );
/*           setAvailableSize(matchedSizes); */

          return {
            img: item.img, // Keep existing img
            colorName: colorDetail?.name, // Assuming color detail has a 'name' property
            colorValue: colorDetail?.value,
            id: colorDetail?._id,
            sizes: matchedSizes,
            // categoryName: categoryName?.name, // Assuming color detail has a 'value' property
            // You may want to add other color details here
          };
        })
      );

      const categoryName = await fetchCategoryName();
      const gender = await fetchGender();

      const updatedProduct = {
        ...product,
        category: categoryName,
        ImgColorPrice: updatedImgColorPrice,
        gender: gender,
      };

      // Set the updated product to nProduct
      setNProduct(updatedProduct);
    };

    updateProduct();
  }, [product]); // Execute effect whenever product changes

  /*   console.log(product); */

  const handleColorButtonClick = (index: number) => {
    if (index !== selectedColorIndex) {
      setIndex(0);
    }
    setSelectedColorIndex(index);
  };

/* console.log(nProduct) */

/*   console.log(availableSize); */
  // Render your product information here
  return (
    <section>
      {/* <Suspense fallback={<ProductSkeleton />}> */}

    <div className="productInfoWrapper flex flex-col w-full justify-center items-center h-full">
      <div className="productInfo flex w-5/6 md:w-5/6 lg:w-2/3 flex-col md:flex-row py-8 gap-8 h-full  md:ml-0 lg:ml-24">
        <div className="LeftImageContainer flex flex-col w-full h-full items-end">
          {nProduct && (
            <div className="BigImageContainer flex flex-col gap-4">
              <img
                
                src={nProduct.ImgColorPrice[selectedColorIndex].img[index].url}
                alt=""
                width={450}
                height={100}
                className="rounded-xl overflow-hidden h-[30rem] "
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
        <div className="RightProductNameAndDeailContainer flex w-full h-full  ">
          <div className="productInfos flex flex-col w-full gap-4">
            <div className="nameContainer flex flex-col gap-2">
              <h1 className="font-semibold text-2xl">{product?.name}</h1>
              {}
              <div className="reviews flex gap-1 items-center">
                <Star className="w-4 text-yellow-300 fill-yellow-300" />
                <Star className="w-4 text-yellow-300 fill-yellow-300" />
                <Star className="w-4 text-yellow-300 fill-yellow-300" />
                <Star className="w-4 text-yellow-300 fill-yellow-300" />
                <StarHalf className="w-4 text-yellow-300 fill-yellow-300" />
                <span className="text-sm text-slate-400 hover:underline cursor-pointer">
                  453 reviews
                </span>
              </div>
              <div className="priceContainer">
                <p className="font-medium text-lg"> €{product?.price}</p>
              </div>

              <div className="productDescriptions">
                <p>{product?.description}</p>
              </div>
            </div>
            <div className=" productColorInfo flex gap-4 mt-2">
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
              { nProduct && (
                <ToggleSize availableSizes={nProduct.ImgColorPrice[selectedColorIndex].sizes} />)}
              <Link href="" className="flex items-center gap-1">
                <p className="text-sm text-slate-400">See guide</p>{" "}
                <MoveUpRight className="w-3" />
              </Link>
            </div>

            <div className="accordation w-full mt-4 ">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Size & Fit</AccordionTrigger>
                  <AccordionContent>
                    <p className="list-disc">
                      {" "}
                      - Fits small; we recommend ordering a half size up
                    </p>
                    <p className="list-disc"> - Designed to last</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      {" "}
                      - Free shipping all over the Portugal including Madeira &
                      Açores
                    </p>
                    <p> - Free, no hassle return </p>
                    <p> - Ships within 24 hours!</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="addTocartButton flex items-center mt-4 gap-4">
              <Button
                type="button"
                className="flex w-full border rounded-2xl gap-4 bg-blue-500 font-semibold"
              >
                <Cart /> Add to cart
              </Button>
              <Button
                type="button"
                className="flex w-fit border rounded-xl hover:bg-red-600"
              >
                <Heart className="" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-24 mb-10" />
      <div className="peopleAlsoLiked ">
        <h1 className="text-2xl">People also liked:</h1>
        <SimilarProduct similarProduct={similiarProducts} />
      </div>
    </div>
    {/* </Suspense> */}

    </section>

  );
};

export default ProductDetails;
