import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  is_verified_purchase: boolean;
  created_at: string;
  website_users: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const useReviews = (productId: string) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);

  useEffect(() => {
    fetchReviews();
    if (user) {
      checkUserReview();
    }
  }, [productId, user]);

  const fetchReviews = async () => {
    // Mock reviews data
    setTimeout(() => {
      const mockReviews: Review[] = [
        {
          id: '1',
          rating: 5,
          title: 'Amazing quality!',
          comment: 'This product exceeded my expectations. The quality is outstanding.',
          is_verified_purchase: true,
          created_at: new Date().toISOString(),
          website_users: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com'
          }
        },
        {
          id: '2',
          rating: 4,
          title: 'Great value',
          comment: 'Very satisfied with this purchase. Fast shipping too!',
          is_verified_purchase: true,
          created_at: new Date().toISOString(),
          website_users: {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com'
          }
        }
      ];
      setReviews(mockReviews);
      setLoading(false);
    }, 500);
  };

  const checkUserReview = async () => {
    // Mock check for user review
    setUserReview(null);
  };

  const submitReview = async (reviewData: { rating: number; title: string; comment: string }) => {
    if (!user) return;

    setSubmitting(true);
    
    // Mock review submission
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now().toString(),
        ...reviewData,
        is_verified_purchase: false,
        created_at: new Date().toISOString(),
        website_users: {
          first_name: 'Current',
          last_name: 'User',
          email: user.email
        }
      };
      
      setReviews(prev => [newReview, ...prev]);
      setUserReview(newReview);
      setSubmitting(false);
    }, 1000);
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
    submitReview,
  };
};