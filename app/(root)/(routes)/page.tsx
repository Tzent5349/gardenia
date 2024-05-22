import FashionCategory from "@/components/categories/fashion-category";
import FeatPro from "@/components/products/FeatPro";
import  FeaturedProduct  from "@/components/products/FeaturedProduct";
import Carousel from "@/components/shared/banner/Carousel";
import React from "react";

const page = () => {
  return (
    <div className="">
      <Carousel />
      <FashionCategory />
      <FeaturedProduct />

    </div>
  );
};

export default page;
