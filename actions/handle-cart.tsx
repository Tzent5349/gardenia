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

export const handleShoppingCart = async (userId: string, productId: string, imgColorPriceId:string, colorId:string, sizeid:string): Promise<User> => {
    const res = await fetch(`${URL}/${userId}/${productId}/${imgColorPriceId}/${colorId}/${sizeid}`);

    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}

export const handleCartAddButton = async (userId: string, cartId: string): Promise<any> => {
    const res = await fetch(`${URL}/add/${userId}/${cartId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}

export const handleCartSubtractButton = async (userId: string, cartId: string): Promise<any> => {
    const res = await fetch(`${URL}/subtract/${userId}/${cartId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}

export const handleCartItemDelete = async (userId: string, cartId: string): Promise<any> => {
    const res = await fetch(`${URL}/delete/${userId}/${cartId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}