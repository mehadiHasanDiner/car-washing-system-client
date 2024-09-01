import { baseApi } from "../../api/baseApi";

const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllServicesQuery } = servicesApi;
