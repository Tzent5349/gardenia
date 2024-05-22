"use server"
import { Size } from "@/types/page"

const URL=`${process.env.NEXT_PUBLIC_API_URL}/sizes`;

export const getSizeById = async (id:string): Promise<Size> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}

export const getAllSizes = async (): Promise<Size[]> => {
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
  