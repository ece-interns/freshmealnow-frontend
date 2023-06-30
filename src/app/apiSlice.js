import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://freshmealnow.up.railway.app",
  prepareHeaders(headers) {
    return headers;
  },
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Restaurant"],
  endpoints: () => ({}),
});
