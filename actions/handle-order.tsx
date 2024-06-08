import { Order } from "@/types/page";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

export const handleUserOrder = async (userId: string, shippingAddress: string, cartItems:any): Promise<Order> => {
  try {
    console.log(cartItems)
    const res = await fetch(`${URL}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shippingAddress, cartItems })
    });

    const data = await res.json();

    if (!res.ok) {
      const errorData = data.error || 'Failed to place the order';
      throw new Error(errorData);
    }

    return data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};
