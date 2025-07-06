
import { User } from "lucide-react";
import { StarRating } from "./StarRating";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  is_verified_purchase: boolean;
  created_at: string;
  website_users: {
    first_name: string | null;
    last_name: string | null;
  };
}

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <p className="text-zinc-400 text-center py-8">
        No reviews yet. Be the first to review this product!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-zinc-700 pb-4 last:border-b-0">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <User className="w-8 h-8 text-zinc-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white font-semibold">
                  {review.website_users.first_name || 'Anonymous'} {review.website_users.last_name || ''}
                </span>
                {review.is_verified_purchase && (
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>
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
          </div>
        </div>
      ))}
    </div>
  );
};
