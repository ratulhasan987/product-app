
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
   
    getProductById: builder.query({
      query: id => `products/${id}`,
    }),
    getCategories: builder.query({
      query: () => `products/categories`,
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} = productsApi;


