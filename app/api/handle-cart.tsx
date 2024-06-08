import { User } from "@/types/page";
import axios from "axios";


const URL = `${process.env.NEXT_PUBLIC_API_URL}/carts`;


/* export const handleShoppingCart = async (userId: string, productId: string): Promise<User> => {
    try {
        const response = await axios.post(`${URL}/${userId}/${productId}`, {
            userId,
            productId
        });

        if (response.status !== 200) {
            throw new Error('Failed to update shopping cart');
        }

        return response.data;
    } catch (error) {
        console.error('Error adding to shopping cart:', error);
        throw error;
    }
} */

/* export const handleShoppingCart = async (userId: string, productId: string): Promise<User> => {
    const res = await fetch(`${URL}/${userId}/${productId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
} */

export const handleShoppingCart = async (userId: string, productId: string): Promise<User> => {
   console.log('handleShoppingCart')
    console.log(userId + productId)
    const res = await fetch(`${URL}/${userId}/${productId}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, productId}),
    });
    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}