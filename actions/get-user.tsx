import { User } from "@/types/page";
import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

export const getUserById = async (id: string): Promise<User> => {
    const res = await fetch(`${URL}/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}

export const addToWishList = async (id: string, productId:string): Promise<User> => {
    const res = await fetch(`${URL}/${id}/${productId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}

/* export const addToWishList = async (userId: string, productId: string) => {
    try {
        const res = await fetch(`${URL}/${userId}/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, productId })
        });

        if (!res.ok) {
            throw new Error('Failed to update wishlist');
        }

        return res.json();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }; */