import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiSearch, FiChevronLeft, FiChevronRight, FiArrowUpRight, FiMapPin,
  FiHome, FiRepeat, FiMap, FiFileText, FiClipboard, FiShield,
  FiLayers, FiGrid, FiTool, FiHardDrive, FiNavigation,
  FiBarChart2, FiBook, FiMessageCircle, FiCheckCircle, FiAward, FiUsers
} from 'react-icons/fi';
import { Button } from '../../components/ui/Button';
import { PropertyCard } from '../../components/ui/PropertyCard';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { useFeaturedProperties } from '../../hooks/useProperties';
import { useCMSContent, useTestimonials } from '../../hooks/useCMS';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getPropertyTypeLabel } from '../../lib/utils';

const SERVICES_LIST = [
  { icon: FiHome,         label: 'Real Estate Brokerage & Marketing' },
  { icon: FiRepeat,       label: 'Property Selling and Buying' },
  { icon: FiMap,          label: 'Land Acquisition' },
  { icon: FiFileText,     label: 'Property Documentation' },
  { icon: FiClipboard,    label: 'Title Transfer Processing' },
  { icon: FiShield,       label: 'DAR & DENR Assistance' },
  { icon: FiSearch,       label: 'Due Diligence & Verification' },
  { icon: FiLayers,       label: 'Land Reclassification' },
  { icon: FiGrid,         label: 'Survey & Subdivision' },
  { icon: FiTool,         label: 'Building Permit Processing' },
  { icon: FiHardDrive,    label: 'Construction & Pabakod' },
  { icon: FiNavigation,   label: 'Access Road Assistance' },
  { icon: FiBarChart2,    label: 'Property Valuation' },
  { icon: FiBook,         label: 'Legal & Publication Processing' },
  { icon: FiMessageCircle,label: 'Real Estate Consultation' },
  { icon: FiCheckCircle,  label: 'Government Clearances' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const carouselRef = useRef(null);
  
  const { data: featuredProperties, isLoading: isPropertiesLoading } = useFeaturedProperties(6);
  const { data: heroContent } = useCMSContent('hero');
  const { data: aboutContent } = useCMSContent('about');
  const { data: testimonials } = useTestimonials();

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 340 : 424; // Card width + gap
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const heroData = heroContent?.content || {
    button_text: 'View Properties',
    button_link: '/properties',
    secondary_button_text: 'Contact Us',
    secondary_button_link: '/contact'
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Home" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6"
            >
              Turning Dreams to Reality
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-cream-50/90 mb-10 max-w-2xl leading-relaxed"
            >
              West Gate Realty Services is dedicated to helping clients with all their real estate needs. Whether you're buying, selling, renting, or managing property, we provide expert guidance and personalized service to ensure a smooth transaction.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link to={heroData.button_link}>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto min-w-[200px]">
                  {heroData.button_text}
                </Button>
              </Link>
              <Link to={heroData.secondary_button_link}>
                <Button size="lg" variant="outline-white" className="w-full sm:w-auto min-w-[200px]">
                  {heroData.secondary_button_text}
                </Button>
              </Link>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-panel p-3 max-w-2xl rounded-2xl flex flex-col sm:flex-row gap-3 shadow-2xl"
            >
              <form onSubmit={handleSearch} className="flex-grow flex items-center relative">
                <FiSearch className="absolute left-4 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by location, property type, or keyword..." 
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white focus:ring-2 focus:ring-crimson-500 text-navy-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <Button onClick={handleSearch} size="lg" variant="primary" className="sm:w-auto py-4 rounded-xl">
                Search
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why West Gate / Services Section */}
      <section className="py-20 bg-cream-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{backgroundColor:'rgba(185,24,30,0.07)'}} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" style={{backgroundColor:'rgba(2,39,77,0.06)'}} />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-sm font-bold text-crimson-600 tracking-wider uppercase mb-2">Why West Gate</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-4">
              Your Trusted Real Estate Partner
            </h3>
            <p className="text-gray-600 text-lg">
              We provide end-to-end real estate solutions — from acquisition to title transfer — with professionalism and expertise.
            </p>
          </div>

          {/* Services Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12"
          >
            {SERVICES_LIST.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                >
                  <Link
                    to="/services"
                    className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-crimson-100 transition-all duration-300 group h-full"
                  >
                    <div className="w-11 h-11 rounded-xl bg-navy-900 group-hover:bg-crimson-600 flex items-center justify-center text-white mb-3 transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-medium text-navy-800 leading-snug">{service.label}</p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="text-center">
            <Link to="/services">
              <Button variant="outline" className="min-w-[200px]">
                View All Services <FiArrowRight className="ml-2 inline" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
            <div>
              <Badge className="bg-crimson-100 text-crimson-600 mb-4 px-3 py-1 text-sm font-bold tracking-wider uppercase">Exclusive Listings</Badge>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-navy-900">Featured Properties</h3>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scrollCarousel('left')}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-navy-900 hover:bg-cream-100 hover:border-cream-200 transition-colors"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scrollCarousel('right')}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-navy-900 hover:bg-cream-100 hover:border-cream-200 transition-colors"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {isPropertiesLoading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
            </div>
          ) : featuredProperties && featuredProperties.length > 0 ? (
            <div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory custom-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredProperties.map(property => {
                const primaryImage = property.property_images?.find(img => img.is_primary)?.url || property.property_images?.[0]?.url;
                
                return (
                  <Link 
                    key={property.id} 
                    to={`/properties/${property.id}`}
                    className="relative flex-none w-[320px] md:w-[400px] h-[450px] md:h-[550px] rounded-3xl overflow-hidden group snap-start bg-gray-100 shadow-sm hover:shadow-xl transition-shadow"
                  >
                    {/* Background Image */}
                    {primaryImage ? (
                      <img 
                        src={primaryImage} 
                        alt={property.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    
                    {/* Glassmorphism/Gradient Overlay for Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    
                    {/* Top Right Icon */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                      <FiArrowUpRight className="w-6 h-6" />
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white">
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                         <Badge className="bg-crimson-600/90 backdrop-blur-md text-white border-none px-3 py-1">{property.price_label || formatPrice(property.price)}</Badge>
                         <Badge className="bg-white/20 backdrop-blur-md text-white border-none px-3 py-1">{getPropertyTypeLabel(property.property_type)}</Badge>
                      </div>
                      
                      <h4 className="text-2xl md:text-3xl font-display font-bold mb-3 line-clamp-2 leading-tight">{property.name}</h4>
                      <p className="text-white/80 flex items-center gap-2 text-sm md:text-base font-medium">
                        <FiMapPin className="text-crimson-400" /> {property.city}, {property.province}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <p className="text-gray-500">No featured properties available at the moment.</p>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link to="/properties">
              <Button variant="outline" className="w-full sm:w-auto min-w-[200px]">
                View All Properties <FiArrowRight className="ml-2 inline" />
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24 bg-navy-900 text-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-crimson-500 tracking-wider uppercase mb-2">Client Stories</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold">What Our Clients Say</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-navy-800 p-8 rounded-2xl border border-navy-700">
                  <div className="flex text-crimson-500 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-cream-50/80 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    {testimonial.client_avatar ? (
                      <img src={testimonial.client_avatar} alt={testimonial.client_name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-navy-700 flex items-center justify-center text-xl font-bold text-crimson-500">
                        {testimonial.client_name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-white">{testimonial.client_name}</h4>
                      <p className="text-sm text-crimson-500">{testimonial.client_title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 text-white text-center relative overflow-hidden" style={{background:'linear-gradient(135deg,#02274d 0%,#b9181e 100%)'}}>
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Your Gateway to Smart Real Estate Investment</h2>
          <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            Trusted Real Estate Intermediary for Local & Foreign Investors.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="crimson" className="min-w-[200px]">
              Contact Us Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
