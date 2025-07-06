import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  } | null;
}

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReview, setUserReview] = useState<any>(null);
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
    if (user) {
      checkUserReview();
    }
  }, [productId, user]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select(`
          *,
          website_users (first_name, last_name)
        `)
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        return;
      }

      // Filter and type check the reviews properly
      const validReviews = (data || []).filter(review => {
        return review && 
               typeof review === 'object' && 
               review.website_users && 
               typeof review.website_users === 'object' &&
               !('error' in review.website_users) &&
               review.website_users !== null;
      }).map(review => ({
        ...review,
        website_users: review.website_users as { first_name: string | null; last_name: string | null; }
      })) as Review[];

      setReviews(validReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserReview = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking user review:', error);
        return;
      }

      setUserReview(data);
    } catch (error) {
      console.error('Error checking user review:', error);
    }
  };

  const submitReview = async () => {
    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }

    if (!newReview.comment.trim()) {
      toast.error('Please write a review comment');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('product_reviews')
        .insert([{
          user_id: user.id,
          product_id: productId,
          rating: newReview.rating,
          title: newReview.title.trim() || null,
          comment: newReview.comment.trim(),
          is_verified_purchase: false,
          is_approved: true
        }]);

      if (error) {
        console.error('Error submitting review:', error);
        toast.error('Failed to submit review');
        return;
      }

      toast.success('Review submitted successfully!');
      setNewReview({ rating: 5, title: '', comment: '' });
      setShowReviewForm(false);
      fetchReviews();
      checkUserReview();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-400'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

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
              {renderStars(Math.round(averageRating))}
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
                <div className="space-y-4 p-4 bg-zinc-800 rounded-lg">
                  <h4 className="text-white font-semibold">Write Your Review</h4>
                  
                  <div>
                    <Label className="text-zinc-300">Rating</Label>
                    {renderStars(newReview.rating, true, (rating) => 
                      setNewReview({ ...newReview, rating })
                    )}
                  </div>

                  <div>
                    <Label className="text-zinc-300">Title (Optional)</Label>
                    <Input
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      className="bg-zinc-700 border-zinc-600 text-white"
                      placeholder="Give your review a title"
                    />
                  </div>

                  <div>
                    <Label className="text-zinc-300">Your Review</Label>
                    <Textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="bg-zinc-700 border-zinc-600 text-white"
                      placeholder="Tell others about your experience with this product"
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      onClick={submitReview}
                      disabled={submitting}
                      className="bg-white text-zinc-950 hover:bg-zinc-100"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                      className="bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {userReview && (
            <div className="mb-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <p className="text-blue-400 text-sm mb-2">Your Review</p>
              <div className="flex items-center space-x-2 mb-2">
                {renderStars(userReview.rating)}
                <span className="text-zinc-400 text-sm">
                  {new Date(userReview.created_at).toLocaleDateString()}
                </span>
              </div>
              {userReview.title && (
                <h4 className="text-white font-semibold mb-1">{userReview.title}</h4>
              )}
              <p className="text-zinc-300">{userReview.comment}</p>
            </div>
          )}

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-zinc-400 text-center py-8">
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-zinc-700 pb-4 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <User className="w-8 h-8 text-zinc-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-semibold">
                          {review.website_users?.first_name || 'Anonymous'} {review.website_users?.last_name || ''}
                        </span>
                        {review.is_verified_purchase && (
                          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        {renderStars(review.rating)}
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
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
