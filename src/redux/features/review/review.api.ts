import { TReview } from "../../../types/review";
import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllReviews: builder.query({
      providesTags: ["review"],
      query: (data: Record<string, unknown>[] | undefined) => {
        const params = new URLSearchParams();
        if (data && data?.length > 0) {
          data.forEach((item) =>
            params.append(String(item?.name), String(item?.value))
          );
        }
        return {
          url: "/review/get-review",
          method: "GET",
          params,
        };
      },
    }),

    createReview: builder.mutation({
      query: (data: TReview) => ({
        url: "/review/post-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const { useFetchAllReviewsQuery, useCreateReviewMutation } = reviewApi;
