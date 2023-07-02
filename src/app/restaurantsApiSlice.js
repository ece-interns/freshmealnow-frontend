import { apiSlice } from "./apiSlice";

const RESTAURANTS_URL = "/api/restaurants";

export const restaurantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginRestaurant: builder.mutation({
      query: (data) => ({
        url: `${RESTAURANTS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logoutRestaurant: builder.mutation({
      query: () => ({
        url: `${RESTAURANTS_URL}/logout`,
        method: "POST",
      }),
    }),
    registerRestaurant: builder.mutation({
      query: (data) => ({
        url: `${RESTAURANTS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    updateRestaurant: builder.mutation({
      query: (data) => ({
        url: `${RESTAURANTS_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
    uploadFeaturedImage: builder.mutation({
      query: (data) => ({
        url: `${RESTAURANTS_URL}/featured-image`,
        method: "POST",
        body: data,
      }),
    }),
    deleteFeaturedImage: builder.mutation({
      query: (data) => ({
        url: `${RESTAURANTS_URL}/featured-image`,
        method: "DELETE",
        headers: data,
      }),
    }),
    uploadImages: builder.mutation({
      query: (data) => ({
        url: `${RESTAURANTS_URL}/upload-images`,
        method: "POST",
        body: data,
      }),
    }),
    deleteImages: builder.mutation({
      query: (data) => ({
        url: `${RESTAURANTS_URL}/delete-images`,
        method: "POST",
        body: data,
      }),
    }),
    getRestaurantsByLocation: builder.query({
      query: (district) => ({
        url: `${RESTAURANTS_URL}/d/${district}`,
      }),
    }),
    getRestaurantById: builder.query({
      query: (id) => ({
        url: `${RESTAURANTS_URL}/${id}`,
      }),
    }),
  }),
});

export const {
  useLoginRestaurantMutation,
  useLogoutRestaurantMutation,
  useRegisterRestaurantMutation,
  useUpdateRestaurantMutation,
  useUploadFeaturedImageMutation,
  useDeleteFeaturedImageMutation,
  useUploadImagesMutation,
  useDeleteImagesMutation,
  useGetRestaurantsByLocationQuery,
  useGetRestaurantByIdQuery,
} = restaurantsApiSlice;
