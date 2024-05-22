"use server"
import { Category } from "@/types/page";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);

  return res.json();
};

export async function  getCategoryDetailsById  (id:string):Promise<Category> {
    const res = await fetch(`${URL}/${id}`)
    return res.json()
}

export async function  getCategoryDetailsByName  (name:string):Promise<Category> {
  const res = await fetch(`${URL}/name/${name}`)
  return res.json()
}
