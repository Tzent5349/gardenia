// Redux/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { handleShoppingCart as updateShoppingCart, handleCartAddButton, handleCartSubtractButton, handleCartItemDelete } from "@/actions/handle-cart"
import { getUserById } from '@/actions/get-user';
import { User } from "@/types/page";

export interface ShoppingCartItem {
    productId: string;
    quantity: number;
    cartId: string;
  }

export interface ShoppingCartState {
    items: { productId: string; quantity: number; cartId?:number }[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ShoppingCartState = {
    items: [],
    status: 'idle',
    error: null,
};

// Async thunk to fetch the user's shopping cart
export const fetchUserShoppingCart = createAsyncThunk(
    'cart/fetchUserShoppingCart',
    async (userId: string, { rejectWithValue }) => {
        try {
            const userData = await getUserById(userId);
            return userData.cartHolder;
        } catch (error: any) {
            console.error('Error fetching shopping cart:', error);
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to handle adding/removing product from user's shopping cart
export const handleShoppingCart = createAsyncThunk(
    'cart/handleShoppingCart',
    async ({ userId, productId, imgColorPriceId, colorId, sizeId }: { userId: string; productId: string, imgColorPriceId: string, colorId: string, sizeId: string }, { rejectWithValue }) => {
        try {
            const updatedUser = await updateShoppingCart(userId, productId, imgColorPriceId, colorId, sizeId);
            return updatedUser.cartHolder;
        } catch (error: any) {
            console.error('Error handling shopping cart:', error);
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to handle adding a product to the user's shopping cart
export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async ({ userId, cartId }: { userId: string; cartId: string }, { rejectWithValue }) => {
        try {
            const updatedUser = await handleCartAddButton(userId, cartId);
            return updatedUser.cartHolder;
        } catch (error: any) {
            console.error('Error adding cart item:', error);
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to handle subtracting a product from the user's shopping cart
export const subtractCartItem = createAsyncThunk(
    'cart/subtractCartItem',
    async ({ userId, cartId }: { userId: string; cartId: string }, { rejectWithValue }) => {
        try {
            const updatedUser = await handleCartSubtractButton(userId, cartId);
            return updatedUser.cartHolder;
        } catch (error: any) {
            console.error('Error subtracting cart item:', error);
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to handle deleting a product from the user's shopping cart
export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async ({ userId, cartId }: { userId: string; cartId: string }, { rejectWithValue }) => {
        try {
            const updatedUser = await handleCartItemDelete(userId, cartId);
            return updatedUser.cartHolder;
        } catch (error: any) {
            console.error('Error deleting cart item:', error);
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserShoppingCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserShoppingCart.fulfilled, (state, action: PayloadAction<{ productId: string; quantity: number }[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchUserShoppingCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(handleShoppingCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(handleShoppingCart.fulfilled, (state, action: PayloadAction<{ productId: string; quantity: number }[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(handleShoppingCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(addCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCartItem.fulfilled, (state, action: PayloadAction<{ productId: string; quantity: number }[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(subtractCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(subtractCartItem.fulfilled, (state, action: PayloadAction<{ productId: string; quantity: number }[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(subtractCartItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<{ productId: string; quantity: number }[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
    },
});

export default cartSlice.reducer;
