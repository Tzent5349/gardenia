"use client";
import React, { useState, useEffect } from "react";
import { getProductDetails } from "@/actions/get-products";
import ProductCard from "../shared/cards/ProductCard";
import { Category, Product } from "@/types/page";

type ProductByCategoryProps = {
  category: any;
};

const ProductByCategory = ({ category }: ProductByCategoryProps) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (category?.products) {
        try {
          const productPromises = category.products.map(
            async (item: string) => {
              const productData = await getProductDetails(item);
              return productData; // Assuming productData.product contains the product details
            }
          );
          const productsData = await Promise.all(productPromises);

          // Extract the product and similarProducts into a single array
          const allProducts: Product[] = productsData.flatMap((data) => [
            data.product,
          ]);

          setProducts(allProducts); // Set the state with the combined array of products
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
      }
    };

    fetchProducts();
  }, [category]);

  /*   console.log(products); */

  return (
    <div>
      <h1>Products by Category</h1>
      <div className="flex w-full px-4 md:px-14 gap-20 mt-14">
        <div className="leftSideFilterOPtion w-1/5 bg-red-400 h-full">
          <h1 className="text-center font-semibold text-xl">Filter By:</h1>
          //Filter Products by priceRange, Sizes, Colors, Genders, Brands
          <div className="priceRange"></div>
          <div className="Sizes"></div>
          <div className="Colors"></div>
          <div className="Genders"></div>
          <div className="Brands"></div>
        </div>

        <div className="rightSideProducts flex w-4/6 ml-auto gap-12  ">
          {products?.map((item) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
