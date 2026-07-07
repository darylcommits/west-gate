import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiTag, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDailyActivities } from '../../hooks/useHeroAndActivities';
import { useRef } from 'react';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-PH', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

const DailyActivitiesSection = () => {
  const { data: activities = [], isLoading } = useDailyActivities(false, 20);
  const [selected, setSelected] = useState(null);
  const carouselRef = useRef(null);

  const scroll = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  if (isLoading || activities.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: 'rgba(185,24,30,0.05)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" style={{ backgroundColor: 'rgba(2,39,77,0.05)' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-sm font-bold text-crimson-600 tracking-wider uppercase mb-2">Behind The Scenes</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-navy-900">Daily Activities</h3>
            <p className="text-gray-500 mt-2">A glimpse into our everyday work and dedication.</p>
          </div>
          {activities.length > 3 && (
            <div className="flex gap-2 shrink-0">
              <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all">
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all">
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 w-72 snap-start cursor-pointer group"
              onClick={() => setSelected(activity)}
            >
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden h-full flex flex-col">
                {/* Media */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {activity.media_url ? (
                    activity.media_type === 'video' ? (
                      <video src={activity.media_url} className="w-full h-full object-cover" muted playsInline />
                    ) : (
                      <img src={activity.media_url} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-navy-50">
                      <span className="text-4xl">📋</span>
                    </div>
                  )}
                  {activity.media_type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-navy-900 ml-1" />
                      </div>
                    </div>
                  )}
                  {/* Date badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1.5 text-xs font-medium text-navy-700">
                    <FiCalendar className="w-3 h-3" />
                    {formatDate(activity.activity_date)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="font-bold text-navy-900 text-base mb-2 line-clamp-2 group-hover:text-crimson-600 transition-colors">
                    {activity.title}
                  </h4>
                  {activity.description && (
                    <p className="text-gray-500 text-sm line-clamp-3 flex-1">{activity.description}</p>
                  )}
                  {activity.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {activity.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="inline-flex items-center gap-1 bg-cream-100 text-navy-700 text-xs px-2 py-0.5 rounded-full">
                          <FiTag className="w-2.5 h-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media */}
              {selected.media_url && (
                <div className="relative">
                  {selected.media_type === 'video' ? (
                    <video src={selected.media_url} controls className="w-full rounded-t-3xl max-h-80 object-cover" />
                  ) : (
                    <img src={selected.media_url} alt={selected.title} className="w-full rounded-t-3xl max-h-80 object-cover" />
                  )}
                  <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-md transition-colors">
                    <FiX className="w-5 h-5 text-navy-900" />
                  </button>
                </div>
              )}

              <div className="p-8">
                {!selected.media_url && (
                  <div className="flex justify-end mb-4">
                    <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <FiX className="w-5 h-5 text-navy-900" />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <FiCalendar className="w-4 h-4 text-crimson-500" />
                  <span>{formatDate(selected.activity_date)}</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-navy-900 mb-4">{selected.title}</h3>
                {selected.description && (
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{selected.description}</p>
                )}
                {selected.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-gray-100">
                    {selected.tags.map((tag, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-cream-50 border border-cream-200 text-navy-700 text-sm px-3 py-1 rounded-full">
                        <FiTag className="w-3 h-3" />{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DailyActivitiesSection;
