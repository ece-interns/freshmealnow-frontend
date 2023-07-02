import { apiSlice } from "./apiSlice";

const ORDERS_URL = "/api/orders";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),
    getOrdersBySessionId: builder.query({
      query: (sessionId) => ({
        url: `${ORDERS_URL}/session/${sessionId}`,
      }),
    }),
    getOrdersByUserId: builder.query({
      query: (userId) => ({
        url: `${ORDERS_URL}/user/${userId}`,
      }),
    }),
    getOrdersByRestaurantId: builder.query({
      query: (restaurantId) => ({
        url: `${ORDERS_URL}/restaurant/${restaurantId}`,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/deliver/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetOrdersBySessionIdQuery,
  useGetOrdersByUserIdQuery,
  useGetOrdersByRestaurantIdQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
