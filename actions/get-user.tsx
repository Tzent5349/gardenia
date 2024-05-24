"use server"
import { User } from "@/types/page"

const URL=`${process.env.NEXT_PUBLIC_API_URL}/users`;

export const getUserById = async (id:any): Promise<User> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}

export const getHandleWishList = async(userId: any, productId: any): Promise<any> => {
    try {
        const res = await fetch(`${URL}/${userId}/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        });
        return res.json();
    } catch (error) {
        console.error('Error handling wishlist:', error);
        throw error;
    }
}
