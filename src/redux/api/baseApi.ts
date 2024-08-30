import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://level-2-24-assignment-3.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("roomBridgeToken") as string);
    headers.set("authorization", `Bearer ${token}`);
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
