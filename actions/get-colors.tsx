import { Color } from "@/types/page";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/colors`;

/* export const getColors = async (): Promise<Color[]> => {
  const res = await fetch(URL);
  return res.json();
}; */

/* export const getColorDetails = async (id:string): Promise<Color> => {

 const res = await fetch (`${URL}/${id}`)
 return res.json();
} */

export const getColorDetails = async (id:string): Promise<Color> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    console.log('Response:', res);
    const data = await res.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching color details:', error);
    throw error; // Optionally re-throw the error to handle it elsewhere
  }
}

/* export default getColors; */
