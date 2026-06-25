import { useQuery } from '@tanstack/react-query';
import { googleReviewsService } from '../services/googleReviewsService';

export const useGoogleReviews = () => {
  return useQuery({
    queryKey: ['google-reviews'],
    queryFn: () => googleReviewsService.getReviews(),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    retry: 1,
  });
};
