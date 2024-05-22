"use client";
import { getCategoryDetailsByName } from "@/actions/get-categories";
import { Category } from "@/types/page";
import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProductByCategory from "@/components/shopBy/ProductByCategory";


type ShopByCategoryProps = {
  params: {
    categoryName: string;
  };
};

const ShopByCategoryPage = ({ params }: ShopByCategoryProps) => {
  const { categoryName } = params;
  const [category, setCategory] = useState<Category | null>(null);
  const newCategoryName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
/*   console.log(categoryName.charAt(0).toUpperCase() + categoryName.slice(1)); */

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategoryDetailsByName(newCategoryName);
          // If categoryData is an array, use the first item, otherwise use categoryData directly
          const selectedCategory = Array.isArray(categoryData) ? categoryData[0] : categoryData;
        setCategory(selectedCategory);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    };


    fetchCategory();

    
  }, [newCategoryName]);

/*   console.log(category); */

  return (
    <div>

{/*       {category ? (
        <div>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}
      <ProductByCategory category={category} />
{/*       <p>Category Name from URL: {categoryName}</p> */}
    </div>
  );
};

export default ShopByCategoryPage;
