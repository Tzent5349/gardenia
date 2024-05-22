"use client";
import React, { useState, useEffect } from "react";
import { getProductDetails } from "@/actions/get-products";
import ProductCard from "../shared/cards/ProductCard";
import { Product } from "@/types/page";
import { getColorDetails } from "@/actions/get-colors";
import { getGenderById } from "@/actions/get-gender";
import { getAllSizes } from "@/actions/get-sizes";

type ProductByCategoryProps = {
  category: any;
};

const ProductByCategory = ({ category }: ProductByCategoryProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [detailedProducts, setDetailedProducts] = useState<any[]>([])
  const [productPrices, setProductPrices] = useState([]);
  const [productBrands, setProductBrands] = useState([]);
  const [productGenders, setProductGenders] = useState([]);
  const [productColors, setProductColors] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    priceRange: [0, Infinity],
    sizes: [] as string[],
    colors: [] as string[],
    genders: [] as string[],
    brands: [] as string[],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      if (category?.products) {
        try {
          const productPromises = category.products.map(async (item: string) => {
            const productData = await getProductDetails(item);
            return productData.product; // Assuming productData contains the product details
          });
          const productsData = await Promise.all(productPromises);

          setProducts(productsData); // Set the state with the combined array of products
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
      }
    };

    fetchProducts();



  }, [category]);

  useEffect(() => {
    { products?.flatMap((product)=>{


      const fetchColorDetails = async (colorId: string) => {
        try {
          const colorDetails = await getColorDetails(colorId);
          return colorDetails;
        } catch (error) {
          console.error("Error fetching color details:", error);
          return null;
        }
      };
  
      const fetchGender = async () => {
        try {
          const genderDetail = await getGenderById(product?.gender);
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
  
  
        const gender = await fetchGender();
  
        const updatedProduct = {
          ...product,
  
          ImgColorPrice: updatedImgColorPrice,
          gender: gender,
        };
  
        // Set the updated product to nProduct
        setDetailedProducts(updatedProduct);
      };
  
      updateProduct();
    })
    }
  },[products]);

  useEffect(() => {
    // Apply filters to products
    const filtered = products.filter((product) => {
      const withinPriceRange =
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesSize = filters.sizes.length === 0 || filters.sizes.some((size) => product.ImgColorPrice.some((icp) => icp.sizeId.includes(size)));
      const matchesColor = filters.colors.length === 0 || filters.colors.some((color) => product.ImgColorPrice.some((icp) => icp.color === color));
      const matchesGender = filters.genders.length === 0 || filters.genders.includes(product.gender);
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);

      return withinPriceRange && matchesSize && matchesColor && matchesGender && matchesBrand;
    });

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  console.log(detailedProducts)

  return (
    <div>
      <h1>Products by Category</h1>
      <div className="flex w-full px-4 md:px-14 gap-20 mt-14">
        <div className="leftSideFilterOPtion w-1/5 bg-red-400 h-full p-4">
          <h1 className="text-center font-semibold text-xl">Filter By:</h1>
          {/* Filter Products by priceRange, Sizes, Colors, Genders, Brands */}
          <div className="priceRange">
            <h2>Price Range</h2>
            <input
              type="number"
              placeholder="Min"
              onChange={(e) => handleFilterChange("priceRange", [Number(e.target.value), filters.priceRange[1]])}
            />
            <input
              type="number"
              placeholder="Max"
              onChange={(e) => handleFilterChange("priceRange", [filters.priceRange[0], Number(e.target.value)])}
            />
          </div>
          <div className="Sizes">
            <h2>Sizes:</h2>
            {/* Render size options with checkboxes */}
          </div>
          <div className="Colors">
            <h2>Colors:</h2>
            {/* Render color options with checkboxes */}
          </div>
          <div className="Genders">
            <h2>Genders:</h2>
            {/* Render gender options with checkboxes */}
          </div>
          <div className="Brands">
            <h2>Brands:</h2>
            {/* Render brand options with checkboxes */}
          </div>
        </div>

        <div className="rightSideProducts flex w-4/6 ml-auto gap-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
