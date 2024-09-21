import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    getAllUsers: builder.query({
      providesTags: ["users"],
      query: () => ({
        url: `auth/users`,
        method: "GET",
      }),
    }),
    getAnUser: builder.query({
      providesTags: ["user"],
      query: (email) => ({
        url: `auth/${email}`,
        method: "GET",
      }),
    }),
    createAdmin: builder.mutation({
      query: (id) => ({
        url: `/auth/create-admin/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
    updateProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/update-profile/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useGetAnUserQuery,
  useCreateAdminMutation,
  useUpdateProfileMutation,
} = authApi;
