"use server";

import { Review } from "@/types/page";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

/* export const getReviewOfProduct = async (productId: string): Promise<Review[]> => {
  try {
    // Fetch reviews for the specific product
    const res = await fetch(`${URL}?productId=${productId}`);
    
    // Check if the response is successful
    if (!res.ok) {
      throw new Error(`Failed to fetch reviews: ${res.statusText}`);
    }

    // Parse and return the JSON response
    const reviews = await res.json();
    return reviews;
  } catch (error) {
    // Handle errors appropriately
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
};
 */

/* export const getReviewOfProduct = async (id:string): Promise<Review> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
} */

export const getReviewOfProduct = async (
  productId: string
): Promise<Review> => {
  try {
    const res = await fetch(`${URL}/${productId}`);
          if (!res.ok) {
        throw new Error(`Failed to fetch reviews: ${res.statusText}`);
      }
          const reviews = await res.json();
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch reviews");
  }
};
