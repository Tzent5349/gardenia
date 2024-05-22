import { Color } from "@/types/page";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/colors`;

export const getColors = async (): Promise<Color[]> => {
  const res = await fetch(URL);
  return res.json();
};

export const getColorDetails = async (id:string): Promise<Color> => {
 const res = await fetch (`${URL}/${id}`)
 return res.json();
}

/* export default getColors; */
