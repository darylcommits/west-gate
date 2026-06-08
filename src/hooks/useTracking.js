import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Generate a random session ID if it doesn't exist
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('wg_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('wg_session_id', sessionId);
  }
  return sessionId;
};

export const useTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      // Don't track admin pages to avoid inflating stats
      if (location.pathname.startsWith('/admin')) return;

      try {
        const sessionId = getSessionId();
        const userAgent = navigator.userAgent;

        await supabase.from('page_views').insert([
          {
            path: location.pathname,
            user_agent: userAgent,
            session_id: sessionId
          }
        ]);
      } catch (error) {
        // Silently fail tracking errors so it doesn't affect user experience
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [location.pathname]);
};
