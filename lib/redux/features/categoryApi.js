import { apiSlice } from "../api/apiSlice";

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: "https://shofy-backend.vercel.app/api/category/add",
        method: "POST",
        body: data,
      }),
    }),
    getShowCategory: builder.query({
      query: () => `NEXT_PUBLIC_API_URL/categories/show`
    }),
    getProductTypeCategory: builder.query({
      query: (type) => `NEXT_PUBLIC_API_URL/categories/show/${type}`
    }),
  }),
});

export const {
 useAddCategoryMutation,
 useGetProductTypeCategoryQuery,
 useGetShowCategoryQuery,
} = categoryApi;
