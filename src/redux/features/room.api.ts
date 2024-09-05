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
      providesTags: ["room"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponse<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addRoom: builder.mutation({
      query: (roomInfo) => ({
        url: "/rooms",
        method: "POST",
        body: roomInfo,
      }),
      invalidatesTags: ["room"],
    }),
    updateRoom: builder.mutation({
      query: (updateRoomInfo) => {
        const { _id, ...bodyData } = updateRoomInfo;
        return {
          url: `/rooms/${_id}`,
          method: "PUT",
          body: bodyData,
        };
      },
      invalidatesTags: ["room"],
    }),
    deleteRoom: builder.mutation({
      query: (deletedId) => {
        return {
          url: `/rooms/${deletedId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["room"],
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = authApi;
