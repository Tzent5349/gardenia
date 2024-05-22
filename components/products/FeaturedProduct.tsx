
import {getProducts} from "@/actions/get-products";
import React from "react";
import ProductCard from "../shared/cards/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ScrollProgress from "./ProgressBar";

const FeaturedProduct = async () => {
  const products = await getProducts();

  return (
    <div className="w-full flex items-center mt-20 flex-col">
        <h1 className="my-6 font-medium text-3xl underline underline-offset-4">Featured Products</h1>
      <ScrollArea className="w-11/12 whitespace-nowrap rounded-md bg-transparent/10">
        <div className="flex w-max h-max space-x-10 p-4 overflow-hidden">
          {products.map(
            (product) =>
              product.featured && product.status === "InStock" && (
                <ProductCard product={product} key={product._id} />
              )
          )}
        </div>
        <ScrollBar orientation="horizontal" className="" />
      </ScrollArea>
    </div>
  );
};

export default FeaturedProduct;
