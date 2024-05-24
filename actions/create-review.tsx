"use server";

export const createReview = async (review: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(`HTTP error! status: ${res.status}, details: ${errorDetails}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error in makingReview:', error);
    throw error;
  }
};
