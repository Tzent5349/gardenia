"use server"
import { Brand } from "@/types/page"

const URL=`${process.env.NEXT_PUBLIC_API_URL}/brands`;

export const getBrandById = async (id:string): Promise<Brand> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}

export const getAllBrands = async (): Promise<Brand[]> => {
    const res = await fetch(`${URL}`);
    return res.json();
}

/* export const getAllSizesByGenderId = async (productGenderId:string) => {
    try {
      // Fetch sizes by product's genderId
      const response = await fetch(`${URL}?productGenderId=${productGenderId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch sizes");
      }
      const sizes = await response.json();
      // Now you have the filtered sizes based on the product's gender
      console.log(sizes);
    } catch (error) {
      console.error(error);
    }
  }; */
  