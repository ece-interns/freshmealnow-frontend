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
    getProductByRestaurantId: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
    }),
    searchProduct: builder.query({
      query: (text) => ({
        url: `${PRODUCTS_URL}/search?q=${text}`,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUploadProductImageMutation,
  useGetProductByRestaurantIdQuery,
  useSearchProductQuery,
} = productsApiSlice;
