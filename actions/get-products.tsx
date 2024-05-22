"use server"
import { Product } from "@/types/page";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/products`;

export const getProducts = async () : Promise<Product[]> => {
  const res = await fetch(URL);
  return res.json();
}

export const getProductDetails = async (id:string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`);
  return res.json();
};



