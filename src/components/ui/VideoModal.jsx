import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useUiStore } from '../../store/uiStore';

export const VideoModal = () => {
  const { videoModal, closeVideoModal } = useUiStore();
  const { isOpen, videoUrl } = videoModal;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeVideoModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeVideoModal]);

  if (!isOpen || !videoUrl) return null;

  // Determine if it's a youtube/vimeo link or a direct mp4
  const isYoutube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const isVimeo = videoUrl.includes('vimeo.com');
  
  let embedUrl = videoUrl;
  if (isYoutube) {
    const videoId = videoUrl.includes('youtu.be') 
      ? videoUrl.split('youtu.be/')[1].split('?')[0]
      : videoUrl.split('v=')[1]?.split('&')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else if (isVimeo) {
    const videoId = videoUrl.split('vimeo.com/')[1];
    embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-navy-900/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-12"
      >
        <button
          onClick={closeVideoModal}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md z-10"
        >
          <FiX className="w-6 h-6" />
        </button>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative"
        >
          {(isYoutube || isVimeo) ? (
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
