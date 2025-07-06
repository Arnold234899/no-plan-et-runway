
import { StarRating } from "./StarRating";

interface UserReviewData {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  created_at: string;
}

interface UserReviewProps {
  review: UserReviewData;
}

export const UserReview = ({ review }: UserReviewProps) => {
  return (
    <div className="mb-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
      <p className="text-blue-400 text-sm mb-2">Your Review</p>
      <div className="flex items-center space-x-2 mb-2">
        <StarRating rating={review.rating} />
        <span className="text-zinc-400 text-sm">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
      {review.title && (
        <h4 className="text-white font-semibold mb-1">{review.title}</h4>
      )}
      <p className="text-zinc-300">{review.comment}</p>
    </div>
  );
};
