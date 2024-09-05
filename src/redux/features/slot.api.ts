import { TResponse } from "../../type/apiResponse.type";
import { baseApi } from "../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            return params.append(item.name, item.value);
          });
        }

        return {
          url: "/slots/availability",
          method: "GET",
          params,
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponse<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["slot"],
    }),
    updateSlot: builder.mutation({
      query: (slotInfo) => ({
        url: "/slots",
        method: "PUT",
        body: slotInfo,
      }),
      invalidatesTags: ["slot"],
    }),
    addSlot: builder.mutation({
      query: (slotInfo) => ({
        url: "/slots",
        method: "POST",
        body: slotInfo,
      }),
      invalidatesTags: ["slot"],
    }),
    deleteSlot: builder.mutation({
      query: (slotId) => ({
        url: `/slots/${slotId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["slot"],
    }),
  }),
});

export const {
  useGetAllSlotsQuery,
  useAddSlotMutation,
  useUpdateSlotMutation,
  useDeleteSlotMutation,
} = slotApi;
