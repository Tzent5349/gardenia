"use client";
import React, { useState, useEffect } from "react";
import { getProductDetails } from "@/actions/get-products";
import ProductCard from "../shared/cards/ProductCard";
import { Product, Gender, Brand, Size, Color } from "@/types/page";
import { getColorDetails } from "@/actions/get-colors";
import { getGenderById } from "@/actions/get-gender";
import { getAllSizes } from "@/actions/get-sizes";
import { getBrandById } from "@/actions/get-brand";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductByCategoryProps = {
  category: any;
};

const ProductByCategory = ({ category }: ProductByCategoryProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [detailedProducts, setDetailedProducts] = useState<any[]>([]);
  const [productPrices, setProductPrices] = useState<number[]>([]);
  const [productBrands, setProductBrands] = useState<any[]>([]);
  const [productGenders, setProductGenders] = useState<string[]>([]);
  const [productColors, setProductColors] = useState<any[]>([]);
  const [productSizes, setProductSizes] = useState<any[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    sizes: [] as string[],
    colors: [] as string[],
    genders: [] as string[],
    brands: [] as string[],
  });

  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (category?.products) {
        try {
          const productPromises = category.products.map(
            async (item: string) => {
              const productData = await getProductDetails(item);
              return productData.product;
            }
          );
          const productsData = await Promise.all(productPromises);
          setProducts(productsData);
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const updateDetailedProducts = async () => {
      const detailedProductsPromises = products.map(async (product) => {
        const fetchColorDetails = async (colorId: string) => {
          try {
            const colorDetails = await getColorDetails(colorId);
            return colorDetails;
          } catch (error) {
            console.error("Error fetching color details:", error);
            return null;
          }
        };

        const fetchGender = async (
          genderId: any
        ): Promise<string | undefined> => {
          try {
            const genderDetail: Gender | undefined = await getGenderById(
              genderId
            );
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
            console.error("Error fetching sizes:", error);
          }
        };

        const fetchBrand = async (brandId: any) => {
          try {
            const fetchedBrand = await getBrandById(brandId);
            return fetchedBrand;
          } catch (error) {
            console.error("Error fetching brand:", error);
          }
        };

        const gender = await fetchGender(product.gender);
        const brand = await fetchBrand(product.brand);
        const updatedImgColorPrice = await Promise.all(
          product.ImgColorPrice.map(async (item: any) => {
            const colorDetail = await fetchColorDetails(item.color);
            const allSizes = await fetchAllSizes();
            const GenderFilteredSizes = allSizes?.filter(
              (size) => size.gender === gender
            )[0]?.value;
            const productSize = item.sizeId;
            const matchedSizes = GenderFilteredSizes?.filter((size) =>
              productSize.includes(size._id)
            );

            return {
              img: item.img,
              colorName: colorDetail?.name,
              colorValue: colorDetail?.value,
              colorId: colorDetail?._id,
              sizes: matchedSizes,
            };
          })
        );

        return {
          ...product,
          ImgColorPrice: updatedImgColorPrice,
          gender: gender,
          brand: { _id: brand?._id, name: brand?.name },
        };
      });

      const detailedProducts = await Promise.all(detailedProductsPromises);
      setDetailedProducts(detailedProducts);

      // Extract filter values
      const prices = new Set<number>();
      const genders = new Set<string>();
      const colorsArray: Color[] = [];
      const sizes: Size[] = [];
      const brands: Brand[] = [];

      detailedProducts.forEach((product) => {
        if (product.brand && !brands.some((b) => b._id === product.brand._id)) {
          brands.push(product.brand);
        }
        prices.add(product.price);
        genders.add(product.gender);
        product.ImgColorPrice.forEach((icp: any) => {
          if (!colorsArray.some((color:any) => color.colorId === icp.colorId)) {
            colorsArray.push({
              colorName: icp.colorName,
              colorValue: icp.colorValue,
              colorId: icp.colorId,
            });
          }
          icp.sizes.forEach((size: any) => {
            if (!sizes.some((s) => s._id === size._id)) {
              sizes.push(size);
            }
          });
        });
      });

      setProductPrices(Array.from(prices).sort((a, b) => a - b));
      setProductBrands(brands);
      setProductGenders(Array.from(genders));
      setProductColors(colorsArray);
      setProductSizes(sizes);
    };

    updateDetailedProducts();
  }, [products]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = detailedProducts.filter((product) => {
        const withinPriceRange =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];
        const matchesSize =
          filters.sizes.length === 0 ||
          filters.sizes.every((size) =>
            product.ImgColorPrice.some((icp:any) =>
              icp.sizes.some((s:any) => s._id === size)
            )
          );
        const matchesColor =
          filters.colors.length === 0 ||
          filters.colors.some((color) =>
            product.ImgColorPrice.some((icp:any) => icp.colorId === color)
          );
/*         const matchesGender =
          filters.genders.length === 0 ||
          filters.genders.includes(product.gender); */
        const matchesBrand =
          filters.brands.length === 0 ||
          filters.brands.includes(product.brand._id);

        return (
          withinPriceRange &&
          matchesSize &&
          matchesColor &&
/*           matchesGender && */
          matchesBrand
        );
      });

      if (sortOrder === "asc") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, detailedProducts, sortOrder]);

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleSliderChangeWrapper: React.FormEventHandler<HTMLDivElement> = (
    event
  ) => {
    const newValue = (event.target as HTMLInputElement).value;
    handleSliderChange(Number(newValue));
  };

  const handleSliderChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        priceRange: newValue,
      }));
    }
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: [value, prevFilters.priceRange[1]],
    }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: [prevFilters.priceRange[0], value],
    }));
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1>Products For {category?.name || "Unknown Category"}</h1>
      <div className="flex w-full px-4 h-full md:px-14 gap-20 mt-14">
        <div className="leftSideFilterOption w-1/5 bg-muted h-full p-4 flex flex-col ">
          <h1 className="text-start font-semibold text-xl">Filter By:</h1>
          <div className="priceRange mt-10">
            <h2 className="text-start">Price Range:</h2>
            <Slider
              aria-label="price-range"
              step={50}
              value={filters.priceRange}
              min={Math.min(...productPrices)}
              max={Math.max(...productPrices)}
              onChange={handleSliderChangeWrapper}
              className="max-w-md"
            />
            <div className="flex justify-between">
              <span> €{Math.min(...productPrices)} </span>
              <span> €{Math.max(...productPrices)} </span>
            </div>
            <div className="flex justify-between mt-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={handleMinPriceChange}
                min={Math.min(...productPrices)}
                max={filters.priceRange[1]}
                className="w-20 p-1"
              />
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={handleMaxPriceChange}
                min={filters.priceRange[0]}
                max={Math.max(...productPrices)}
                className="w-20 p-1"
              />
            </div>
          </div>
          {/* Sizes */}
          <div className="Sizes flex flex-col w-full flex-wrap mt-10">
            <h2 className="text-start">Sizes:</h2>
            <div className="flex w-full flex-wrap mt-4 gap-6">
              {productSizes.map((size) => (
                <div key={size._id}>
                  <input
                    type="checkbox"
                    id={size._id}
                    value={size._id}
                    onChange={(e) => {
                      const newSizes = e.target.checked
                        ? [...filters.sizes, size._id]
                        : filters.sizes.filter((s) => s !== size._id);
                      handleFilterChange("sizes", newSizes);
                    }}
                  />
                  <label htmlFor={size._id}> {size.EU} </label>
                </div>
              ))}
            </div>
          </div>

          <section className="w-full mt-10">
            <h2 className="text-start">Colors:</h2>
            <div className="flex flex-col mt-4 gap-4 ">
              {productColors.map((color) => (
                <div key={color.colorId} className="flex w-full gap-2">
                  <input
                    type="checkbox"
                    id={color.colorId}
                    value={color.colorId}
                    onChange={(e) => {
                      const newColors = e.target.checked
                        ? [...filters.colors, color.colorId]
                        : filters.colors.filter((c) => c !== color.colorId);
                      handleFilterChange("colors", newColors);
                    }}
                  />
                  <label
                    htmlFor={color.colorId}
                    className="flex gap-2 items-center"
                  >
                    {color.colorName}
                    <div
                      style={{ backgroundColor: color.colorValue }}
                      className="w-4 h-4 "
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>
          <div className="Genders mt-10">
            <h2>Genders:</h2>
            <div className=" flex flex-col gap-4 mt-4">
              {productGenders.map((gender) => (
                <div key={gender} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={gender}
                    value={gender}
                    onChange={(e) => {
                      const newGenders = e.target.checked
                        ? [...filters.genders, gender]
                        : filters.genders.filter((g) => g !== gender);
                      handleFilterChange("genders", newGenders);
                    }}
                  />
                  <label htmlFor={gender}>{gender}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="Brands mt-14">
            <h2 className="mb-4">Brands:</h2>
            {productBrands.map((brand) => (
              <div key={brand._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={brand._id}
                  value={brand._id}
                  onChange={(e) => {
                    const newBrands = e.target.checked
                      ? [...filters.brands, brand._id]
                      : filters.brands.filter((b) => b !== brand._id);
                    handleFilterChange("brands", newBrands);
                  }}
                />
                <label htmlFor={brand._id}>{brand.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="rightSideProducts flex flex-col w-5/6 ml-auto gap-12">
          <section className="sortProduct  ml-auto">
            <Select
              value={sortOrder}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </section>
          <section className="w-full flex gap-14 flex-wrap ml-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div key={item._id} className="">
                  <ProductCard product={item} />
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
