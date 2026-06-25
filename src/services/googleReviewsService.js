const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;

export const googleReviewsService = {
  async getReviews() {
    if (!API_KEY || !PLACE_ID) return [];

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=en`,
      {
        headers: {
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'reviews,rating,userRatingCount,displayName',
        },
      }
    );

    if (!res.ok) throw new Error(`Google Places API error: ${res.status}`);
    const data = await res.json();

    // Normalize to the same shape as our testimonials
    return (data.reviews || []).map((r) => ({
      id: `google-${r.authorAttribution?.uri || Math.random()}`,
      client_name: r.authorAttribution?.displayName || 'Anonymous',
      client_avatar: r.authorAttribution?.photoUri || null,
      client_title: 'Google Review',
      content: r.text?.text || '',
      rating: r.rating || 5,
      is_google: true,
      published_at: r.relativePublishTimeDescription || '',
    }));
  },
};
