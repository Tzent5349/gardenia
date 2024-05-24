"use client";
import React, { useEffect, useState } from "react";
import { getProductDetails } from "@/actions/get-products";
import { getColorDetails } from "@/actions/get-colors";
import ProductDetails from "@/components/products/ProductDetails";
/* import ProductSkeleton from "../loading"; */
import { Suspense } from "react";
import { Product } from "@/types/page";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "./loading";


type ProductDetailProps = {
  params: {
    productId: string;
  };
};


const Page = ({ params: { productId } }: ProductDetailProps) => {
  /*   const fetchProductDetails = async (productId: string) => {
    try {
      const productDetails = await getProductDetails(productId);
      return productDetails;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }; */
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<any>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details
        const response = await getProductDetails(productId);
        /*         setProductDetails(response); */
        setProductDetails(response);
        setLoading(false); // Set loading to false after 5 seconds
      // Introduce a delay using setTimeout
/*       setTimeout(() => {
      }, 1000); */ // 5000 milliseconds = 5 seconds
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [productId]);

  /*   const fetchSimiliarProducts = async (productId: string) => {
    try {
      const similiarProducts = await getSimilarProducts(productId);

    return similiarProducts;

    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  } */

  /*   const fetchColorDetails = async (colorId: string) => {
    try {
      const colorDetails = await getColorDetails(colorId);
      return colorDetails;
    } catch (error) {
      console.error("Error fetching color details:", error);
      return null;
    }
  }; */

  /*   const renderProduct = async () => {
    const product = await fetchProductDetails(productId);
    const similiarProducts = await fetchProductDetails(productId)
    console.log(product)

    if (!product) {
      return <div>Loading...</div>;
    } */


/*   if (!productDetails) {
    return <ProductSkeleton />;
  } */



  if (loading || !productDetails) {
    return (
      <div>
{/*         <ProductSkeleton /> */}
      <Loading />
{/* <Skeleton className="h-4 w-[250px]" /> */}
      </div>
    );
  }

/*   const { product, similarProducts } = productDetails; */

/* console.log(productDetails) */

  return (
    <section>
      <div className="flex items-center justify-center w-full">

        <ProductDetails product={productDetails.product} similiarProducts={productDetails.similarProducts} />
      </div>
    </section>
  );
};

/*   return <div>{renderProduct()}</div>;
}; */

export default Page;
