import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useUiStore } from '../../store/uiStore';

export const ImageGallery = () => {
  const { imageGallery, closeImageGallery, openImageGallery } = useUiStore();
  const { isOpen, images, currentIndex } = imageGallery;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeImageGallery();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, images.length]);

  const handlePrevious = () => {
    if (images.length <= 1) return;
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    openImageGallery(images, newIndex);
  };

  const handleNext = () => {
    if (images.length <= 1) return;
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    openImageGallery(images, newIndex);
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-navy-900/95 backdrop-blur-xl flex items-center justify-center"
      >
        {/* Top Bar */}
        <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
          <div className="text-white/80 font-medium">
            {currentIndex + 1} / {images.length}
          </div>
          <button
            onClick={closeImageGallery}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Main Image Area */}
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12">
          {images.length > 1 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 sm:left-8 p-3 sm:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md z-10"
            >
              <FiChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentIndex].url}
            alt={images[currentIndex].caption || `Property Image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain drop-shadow-2xl"
          />

          {images[currentIndex].caption && (
            <div className="absolute bottom-24 bg-black/60 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm">
              {images[currentIndex].caption}
            </div>
          )}

          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 sm:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md z-10"
            >
              <FiChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex justify-center gap-2 overflow-x-auto custom-scrollbar pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => openImageGallery(images, idx)}
                  className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all ${
                    idx === currentIndex ? 'ring-2 ring-crimson-500 scale-110 z-10' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
