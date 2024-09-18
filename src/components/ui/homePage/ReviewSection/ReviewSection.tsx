import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hook";
import { Button, Card, Input, Rate, Typography } from "antd";

type TReview = {
  user: string;
  rating: number;
  feedback: string;
};

const { TextArea } = Input;

const ReviewSection = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (rating && feedback) {
      const newReview = {
        rating,
        feedback,
        user: user?.name,
      };
      // setReviews([...reviews, newReview]);
      // setRating(0);
      // setFeedback("");
    }
  };

  // Calculate the average rating
  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-20">
      <div className="relative bg-white my-shadow-1 rounded-xl p-4">
        <div className="-mb-4">
          <h1 className="text-4xl font-semibold">Review</h1>
          <p className="text-xl mt-2">
            Please share your thinking, by which we can improve service
          </p>
        </div>

        {!user && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-xl z-50">
            <p className="text-xl text-purple-200">
              Please log in for submitting you valuable review
            </p>
            <Button
              style={{ marginTop: "10px" }}
              className="cursor-pointer button-card"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        )}

        <div className={`${!user && "opacity-50"}`}>
          <div className="my-10">
            <Rate onChange={setRating} value={rating} disabled={!user} />
            <TextArea
              rows={4}
              placeholder="We appreciate you value feedback."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              disabled={!user}
            />
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ marginTop: "10px" }}
              disabled={!user}
            >
              Submit
            </Button>
          </div>
          <div className="rounded-xl my-shadow-1 my-4 p-7">
            <Typography.Title level={4}>
              Average Rating: {averageRating.toFixed(1)} / 5
            </Typography.Title>
          </div>
          <div>
            <h3>Latest Reviews</h3>
            {reviews.slice(-2).map((review, index) => (
              <Card key={index} style={{ marginBottom: "10px" }}>
                <Rate disabled value={review.rating} />
                <Typography.Paragraph>{review.feedback}</Typography.Paragraph>
                <Typography.Text type="secondary">
                  - {review.user}
                </Typography.Text>
              </Card>
            ))}
          </div>
        </div>

        <Button
          type="default"
          onClick={() => {
            navigate("/user-review");
          }}
        >
          See Latest Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewSection;
