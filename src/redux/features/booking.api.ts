import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllRooms: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((item: { name: string; value: string }) => {
    //         return params.append(item.name, item.value);
    //       });
    //     }

    //     return {
    //       url: "/rooms",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   transformResponse: (response: TResponse<any>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    addBooking: builder.mutation({
      query: (userInfo) => ({
        url: "/bookings",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useAddBookingMutation } = authApi;
