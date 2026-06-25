import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiTag, FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi';
import { usePublishedTransactions } from '../../hooks/useTransactions';
import { Spinner } from '../../components/ui/Spinner';
import { format } from 'date-fns';

const TransactionModal = ({ item, onClose }) => {
  if (!item) return null;
  const isVideo = item.media_type === 'video';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Media */}
          <div className="relative aspect-video bg-navy-900 shrink-0">
            {isVideo ? (
              <video
                src={item.media_url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={item.media_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-crimson-600 bg-crimson-50 px-3 py-1 rounded-full">
                <FiTag className="w-3.5 h-3.5" />
                {item.service_type}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <FiCalendar className="w-3.5 h-3.5" />
                {item.transaction_date ? format(new Date(item.transaction_date), 'MMMM d, yyyy') : ''}
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-navy-900 mb-4">{item.title}</h2>
            {item.description && (
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.description}</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const TransactionsSection = () => {
  const { data: transactions, isLoading } = usePublishedTransactions(12);
  const [selected, setSelected] = useState(null);
  const carouselRef = useRef(null);

  const scroll = (dir) => {
    if (carouselRef.current) {
      const amount = window.innerWidth < 768 ? 310 : 380;
      carouselRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  if (isLoading) return (
    <section className="py-24 bg-cream-50 flex justify-center items-center">
      <Spinner size="lg" />
    </section>
  );

  if (!transactions || transactions.length === 0) return null;

  return (
    <section className="py-24 bg-cream-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div>
            <span className="inline-block bg-crimson-100 text-crimson-600 text-sm font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
              Proof of Transactions
            </span>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-navy-900">Recent Transactions</h3>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-navy-900 hover:bg-white hover:border-navy-200 transition-colors"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-navy-900 hover:bg-white hover:border-navy-200 transition-colors"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {transactions.map((item) => {
            const isVideo = item.media_type === 'video';
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelected(item)}
                className="relative flex-none w-[280px] md:w-[350px] rounded-3xl overflow-hidden cursor-pointer group snap-start shadow-sm hover:shadow-xl transition-shadow bg-white"
              >
                {/* Thumbnail */}
                <div className="relative h-[220px] md:h-[260px] bg-navy-900 overflow-hidden">
                  {item.media_url ? (
                    <img
                      src={item.thumbnail_url || item.media_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Media</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                        <FiPlay className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  )}
                  {/* Date badge */}
                  {item.transaction_date && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      <FiCalendar className="w-3 h-3" />
                      {format(new Date(item.transaction_date), 'MMM d, yyyy')}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <span className="inline-block text-xs font-bold text-crimson-600 bg-crimson-50 px-2.5 py-1 rounded-full mb-3">
                    {item.service_type}
                  </span>
                  <h4 className="font-display font-bold text-navy-900 text-lg leading-snug line-clamp-2 mb-2">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <TransactionModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default TransactionsSection;
