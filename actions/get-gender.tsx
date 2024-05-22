"use server"

import { Gender } from "@/types/page"

const URL=`${process.env.NEXT_PUBLIC_API_URL}/genders`;

export const getGenderById = async (id:string): Promise<Gender> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}