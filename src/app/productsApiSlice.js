import { apiSlice } from "./apiSlice";

const PRODUCTS_URL = "/api/products";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/image`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateProductMutation, useUploadProductImageMutation } =
  productsApiSlice;
