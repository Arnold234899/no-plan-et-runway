
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { UserReview } from "./UserReview";
import { useReviews } from "@/hooks/useReviews";

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const {
    reviews,
    loading,
    submitting,
    userReview,
    averageRating,
    submitReview
  } = useReviews(productId);

  const handleSubmitReview = async (reviewData: { rating: number; title: string; comment: string }) => {
    const success = await submitReview(reviewData);
    if (success) {
      setShowReviewForm(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Customer Reviews</span>
            <div className="flex items-center space-x-2">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-zinc-400">({reviews.length} reviews)</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user && !userReview && (
            <div className="mb-6">
              {!showReviewForm ? (
                <Button 
                  onClick={() => setShowReviewForm(true)}
                  className="bg-white text-zinc-950 hover:bg-zinc-100"
                >
                  Write a Review
                </Button>
              ) : (
                <ReviewForm
                  onSubmit={handleSubmitReview}
                  onCancel={() => setShowReviewForm(false)}
                  submitting={submitting}
                />
              )}
            </div>
          )}

          {userReview && <UserReview review={userReview} />}

          <ReviewList reviews={reviews} />
        </CardContent>
      </Card>
    </div>
  );
};
