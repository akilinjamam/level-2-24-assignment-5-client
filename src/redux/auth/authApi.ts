import { TResponse } from "../../type/apiResponse.type";
import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    registration: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            return params.append(item.name, item.value);
          });
        }

        return {
          url: "/auth",
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponse<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateUser: builder.mutation({
      query: (updatedInfo) => ({
        url: `/auth/${updatedInfo.id}`,
        method: "PUT",
        body: updatedInfo.data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} = authApi;
