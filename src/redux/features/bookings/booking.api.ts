import { TBooking, TUserBooking } from "../../../types/bookings.types";
import { baseApi } from "../../api/baseApi";

interface IQueryOptions {
  filter?: string;
  page?: string | number;
  limit?: number | string;
}

const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<{ data: any; success: boolean }, TBooking>({
      query: (payload: TBooking) => {
        return {
          url: `/bookings`,
          body: payload,
          method: "POST",
        };
      },
      invalidatesTags: ["booking"],
    }),
    getAllBookings: builder.query<
      { data: TUserBooking[]; totalDoc: number },
      IQueryOptions
    >({
      query: ({ limit, page }) => {
        return {
          url: `/bookings?page=${page || "1"}&limit=${limit || 10}`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
    getUserAllBookings: builder.query<
      { data: TUserBooking[]; totalDoc: number },
      { filter: string }
    >({
      query: ({ filter }) => {
        return {
          url: `/my-bookings?${filter}`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
  }),
});



export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetUserAllBookingsQuery,
} = slotsApi;
