import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserById, addToWishList } from '@/actions/get-user';

export interface WishListState {
    items: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    length: number;
}

const initialState: WishListState = {
    items: [],
    status: 'idle',
    error: null,
    length: 0,
};

// Async thunk to fetch wish list for a specific user
export const fetchUserWishList = createAsyncThunk(
    'wishList/fetchUserWishList',
    async (userId: string, { rejectWithValue }) => {
        try {
            const userData = await getUserById(userId);
            return userData.wishList;
        } catch (error:any) {
            console.error('Error fetching wish list:', error);
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to handle adding/removing product from user's wish list
export const handleWishList = createAsyncThunk(
    'wishList/handleWishList',
    async ({ userId, productId }: { userId: string; productId: string }, { rejectWithValue }) => {
        try {
            const updatedUser = await addToWishList(userId, productId);
            return updatedUser.wishList;
        } catch (error:any) {
            console.error('Error handling wish list:', error);
            return rejectWithValue(error.message);
        }
    }
);

const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserWishList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserWishList.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.length = action.payload.length;
            })
            .addCase(fetchUserWishList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(handleWishList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(handleWishList.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.length = action.payload.length;
            })
            .addCase(handleWishList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export default wishListSlice.reducer;
