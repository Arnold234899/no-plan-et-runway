
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

interface ReviewFormProps {
  onSubmit: (review: { rating: number; title: string; comment: string }) => void;
  onCancel: () => void;
  submitting: boolean;
}

export const ReviewForm = ({ onSubmit, onCancel, submitting }: ReviewFormProps) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });

  const renderStars = (rating: number, onRate: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-400'
            } cursor-pointer hover:text-yellow-400`}
            onClick={() => onRate(star)}
          />
        ))}
      </div>
    );
  };

  const handleSubmit = () => {
    onSubmit(newReview);
    setNewReview({ rating: 5, title: '', comment: '' });
  };

  return (
    <div className="space-y-4 p-4 bg-zinc-800 rounded-lg">
      <h4 className="text-white font-semibold">Write Your Review</h4>
      
      <div>
        <Label className="text-zinc-300">Rating</Label>
        {renderStars(newReview.rating, (rating) => 
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
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-white text-zinc-950 hover:bg-zinc-100"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </Button>
        <Button 
          variant="outline"
          onClick={onCancel}
          className="bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
