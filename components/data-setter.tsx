import { addToCart } from '@/lib/store/features/cart/cartSlice';
import { toggleWishList, fetchWishListForUser } from '@/lib/store/features/wishList/wishListSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import React, { useEffect } from 'react';

const DataSetter = ({ data }: { data: any }) => {
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector((state) => state.wishList.items);

    useEffect(() => {
        // Dispatch action to add item to cart
        dispatch(addToCart(data));
        
        // Dispatch action to toggle wishlist
        dispatch(toggleWishList(data));

        // Dispatch action to update wishlist on the backend
        const userId = 'your_user_id'; // Replace with actual user ID
        dispatch(fetchWishListForUser({ userId, productId: data }));
    }, [data, dispatch]);

    return <></>;
};

export default DataSetter;
