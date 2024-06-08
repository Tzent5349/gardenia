import { Color } from "@/types/page";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/colors`;

export const getColors = async (): Promise<Color[]> => {
  const res = await fetch(URL);
  return res.json();
};

/* export const getColorDetails = async (id:string): Promise<Color> => {

 const res = await fetch (`${URL}/${id}`)
 return res.json();
} */

export async function getColorById (id:string): Promise<Color>  {
  try {
    const res = await fetch(`${URL}/${id}`);

    return res.json()
  } catch (error) {
    console.error('Error fetching color details:', error);
    throw error; // Optionally re-throw the error to handle it elsewhere
  }
}

/* export default getColors; */
