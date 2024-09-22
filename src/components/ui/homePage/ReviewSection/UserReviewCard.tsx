import { FaRegStar, FaQuoteLeft, FaStar } from "react-icons/fa6";
import { TReview } from "../../../../types/review";
import { TUser } from "../../../../types/user";

const UserReviewCard = ({ review }: { review: TReview }) => {
  return (
    <div className="bg-white p-5 shadow-md relative border border-purple-200">
      <div className="space-y-3">
        <p className="text-slate-600 text-center">{review?.comment}</p>
        <div className="flex items-center gap-1 justify-center">
          {Array.from({ length: review?.rating })?.map((_, id) => {
            return <FaStar key={id} className="text-purple-800" />;
          })}
          {Array.from({ length: 5 - review?.rating })?.map((_, id) => {
            return <FaRegStar key={id} className="text-purple-800" />;
          })}
        </div>
        <div className="text-center">
          <h5 className="-mb-1 font-medium">{(review?.user as TUser)?.name}</h5>
          <small className="text-slate-500">
            {(review?.user as TUser)?.email}
          </small>
        </div>
      </div>
      <div className="absolute  -left-1 -top-4 text-6xl">
        <FaQuoteLeft color="purple" size={36} />
      </div>
    </div>
  );
};

export default UserReviewCard;
