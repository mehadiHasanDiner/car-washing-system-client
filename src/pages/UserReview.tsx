import { Breadcrumb, BreadcrumbItem } from "keep-react";
import { useFetchAllReviewsQuery } from "../redux/features/review/review.api";
import { TReview } from "../types/review";
import { useNavigate } from "react-router-dom";
import { PiCaretRightBold } from "react-icons/pi";
import UserReviewCard from "../components/ui/homePage/ReviewSection/UserReviewCard";

const UserReview = () => {
  const { data: reviews, isLoading: fetchingReviews } =
    useFetchAllReviewsQuery(undefined);
  const navigate = useNavigate();

  console.log(reviews);
  return (
    <>
      <section className=" my-20">
        <div className="container flex flex-col items-center">
          <h2 className="text-4xl font-bold">User Reviews</h2>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => navigate("/")}>Home</BreadcrumbItem>
            <BreadcrumbItem className="cursor-auto hover:text-black">
              <PiCaretRightBold size={18} color="#455468" />
              User Reviews
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </section>
      <section>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {!reviews?.data?.length || fetchingReviews ? (
            <div className="bg-white border border-slate-200 animate-pulse p-5 space-y-3">
              <div className="h-20 w-full bg-gray-100"></div>
              <div className="h-5 w-full bg-gray-100"></div>
              <div className="h-10 w-full bg-gray-100"></div>
            </div>
          ) : (
            reviews?.data?.map((review: TReview) => (
              <UserReviewCard key={review?._id} review={review} />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default UserReview;
