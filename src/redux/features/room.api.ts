import { TResponse } from "../../type/apiResponse.type";
import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            return params.append(item.name, item.value);
          });
        }

        return {
          url: "/rooms",
          method: "GET",
          params,
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponse<any>) => {
        console.log("inside redux", response);

        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    // registration: builder.mutation({
    //   query: (userInfo) => ({
    //     url: "/rooms/signup",
    //     method: "POST",
    //     body: userInfo,
    //   }),
    // }),
  }),
});

export const { useGetAllRoomsQuery } = authApi;
