"use server";

export const createUser = async (user: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};
