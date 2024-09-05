import { TResponse } from "../../type/apiResponse.type";
import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBooking: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            return params.append(item.name, item.value);
          });
        }

        return {
          url: "/my-bookings",
          method: "GET",
          params,
        };
      },
      providesTags: ["booking"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponse<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAdminBooking: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            return params.append(item.name, item.value);
          });
        }

        return {
          url: "/bookings",
          method: "GET",
          params,
        };
      },
      providesTags: ["booking"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponse<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addBooking: builder.mutation({
      query: (userInfo) => ({
        url: "/bookings",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["booking"],
    }),
    addPayment: builder.mutation({
      query: (paymentInfo) => ({
        url: "/success/payment",
        method: "POST",
        body: paymentInfo,
      }),
      invalidatesTags: ["booking"],
    }),
    updateBooking: builder.mutation({
      query: (bookingInfo) => ({
        url: `/bookings/${bookingInfo.id}`,
        method: "PUT",
        body: bookingInfo.data,
      }),
      invalidatesTags: ["booking"],
    }),
    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useAddPaymentMutation,
  useGetMyBookingQuery,
  useGetAdminBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = authApi;
