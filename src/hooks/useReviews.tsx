import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
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
  };
}

export const useReviews = (productId: string) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userReview, setUserReview] = useState<any>(null);

  useEffect(() => {
    fetchReviews();
    if (user) {
      checkUserReview();
    }
  }, [productId, user]);

  const fetchReviews = async () => {
    try {
      // Fetch reviews and user data separately since there's no direct relationship
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
        return;
      }

      // Get unique user IDs from reviews
      const userIds = [...new Set(reviewsData?.map(review => review.user_id) || [])];
      
      // Fetch user data for those IDs
      const { data: usersData, error: usersError } = await supabase
        .from('website_users')
        .select('user_id, first_name, last_name')
        .in('user_id', userIds);

      if (usersError) {
        console.error('Error fetching users:', usersError);
      }

      // Create a map of user data for quick lookup
      const usersMap = new Map();
      (usersData || []).forEach(user => {
        usersMap.set(user.user_id, user);
      });

      // Transform the data to match our Review interface
      const transformedReviews = (reviewsData || []).map((review) => {
        const userData = usersMap.get(review.user_id) || {};
        return {
          id: review.id,
          rating: review.rating,
          title: review.title,
          comment: review.comment,
          is_verified_purchase: review.is_verified_purchase,
          created_at: review.created_at,
          website_users: {
            first_name: userData.first_name || null,
            last_name: userData.last_name || null,
          },
        };
      }) as Review[];

      setReviews(transformedReviews);
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

  const submitReview = async (reviewData: { rating: number; title: string; comment: string }) => {
    if (!user) {
      toast.error('Please sign in to leave a review');
      return false;
    }

    if (!reviewData.comment.trim()) {
      toast.error('Please write a review comment');
      return false;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('product_reviews')
        .insert([{
          user_id: user.id,
          product_id: productId,
          rating: reviewData.rating,
          title: reviewData.title.trim() || null,
          comment: reviewData.comment.trim(),
          is_verified_purchase: false,
          is_approved: true
        }]);

      if (error) {
        console.error('Error submitting review:', error);
        toast.error('Failed to submit review');
        return false;
      }

      toast.success('Review submitted successfully!');
      fetchReviews();
      checkUserReview();
      return true;
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return {
    reviews,
    loading,
    submitting,
    userReview,
    averageRating,
    submitReview
  };
};
