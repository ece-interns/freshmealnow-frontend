import { apiSlice } from "./apiSlice";

const PAYMENTS_URL = "/api/payments";

export const paymentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: `${PAYMENTS_URL}/checkout`,
        method: "POST",
        body: data,
      }),
    }),
    getKey: builder.query({
      query: () => ({
        url: `${PAYMENTS_URL}/key`,
      }),
    }),
  }),
});

export const { useCheckoutMutation, useGetKeyQuery } = paymentsApiSlice;
