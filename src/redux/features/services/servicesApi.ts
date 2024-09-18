import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      providesTags: ["services"],
      query: (data: Record<string, unknown>[] | undefined) => {
        const params = new URLSearchParams();
        if (data && data?.length > 0) {
          data.forEach((item) =>
            params.append(String(item?.name), String(item?.value))
          );
        }
        return {
          url: "/services",
          method: "GET",
          params,
        };
      },
    }),
    getSingleServices: builder.query({
      providesTags: (_result, _err, id) => [{ type: "services", id }],
      query: (id: string) => {
        return {
          url: `/services/${id}`,
          method: "GET",
        };
      },
    }),
    createService: builder.mutation({
      query: (data) => {
        return {
          url: `/services/`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["services"],
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/services/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["services"],
    }),
    deleteService: builder.mutation({
      query: (id) => {
        return {
          url: `/services/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetSingleServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
