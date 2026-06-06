import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiMaximize, FiHome, FiShare2, FiCheck, FiVideo, FiFileText, FiPhone, FiMail, FiSend } from 'react-icons/fi';
import { BiBed, BiBath } from 'react-icons/bi';
import { useProperty, useRelatedProperties } from '../../hooks/useProperties';
import { useUiStore } from '../../store/uiStore';
import { useSubmitInquiry } from '../../hooks/useInquiries';
import { formatPrice, getPropertyTypeLabel, formatArea } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { Badge, FeaturedBadge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { PropertyCard } from '../../components/ui/PropertyCard';
import toast from 'react-hot-toast';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { openImageGallery, openVideoModal } = useUiStore();
  const submitInquiry = useSubmitInquiry();

  const { data: property, isLoading, isError } = useProperty(id);
  const { data: relatedProperties } = useRelatedProperties(id, property?.property_type);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-cream-50"><Spinner size="xl" /></div>;
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50 text-center px-4">
        <h1 className="text-3xl font-bold text-navy-900 mb-4">Property Not Found</h1>
        <p className="text-gray-600 mb-8">The property you are looking for does not exist or has been removed.</p>
        <Link to="/properties"><Button>Browse Properties</Button></Link>
      </div>
    );
  }

  const primaryImgObj = property.property_images?.find(img => img.is_primary) || property.property_images?.[0];
  const otherImgObjs = property.property_images?.filter(img => img.id !== primaryImgObj?.id) || [];
  const galleryImages = [primaryImgObj, ...otherImgObjs].filter(Boolean);
  
  const primaryImage = primaryImgObj?.url;
  const displayImages = galleryImages.map(img => img.url); // Extract URLs for the grid

  const handleShare = async () => {
    try {
      await navigator.share({
        title: property.name,
        text: `Check out this property: ${property.name}`,
        url: window.location.href,
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('embed/')) return url;
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    try {
      await submitInquiry.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || `I am interested in ${property.name} (${property.property_code}). Please send me more details.`,
        property_id: property.id,
        status: 'new'
      });
      setSubmitted(true);
    } catch (error) {
      // handled by hook
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen pb-20">
      {/* Image Grid Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex gap-2 mb-3">
              <Badge status={property.status} />
              {property.is_featured && <FeaturedBadge />}
              <Badge className="bg-gray-200 text-gray-800">{property.property_code}</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-navy-900 mb-2">{property.name}</h1>
            <p className="text-lg text-gray-600 flex items-center gap-2">
              <FiMapPin className="text-crimson-600" />
              {property.location}, {property.barangay}, {property.city}, {property.province}
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-4xl font-display font-bold text-crimson-600">
              {property.price_label || formatPrice(property.price)}
            </p>
            <p className="text-gray-500 font-medium">{getPropertyTypeLabel(property.property_type)}</p>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8">
          <div 
            className="md:col-span-2 row-span-2 relative cursor-pointer group"
            onClick={() => openImageGallery(galleryImages, 0)}
          >
            {primaryImage ? (
              <img src={primaryImage} alt={property.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          
          {displayImages.slice(1, 3).map((url, idx) => (
            <div 
              key={idx} 
              className="hidden md:block relative cursor-pointer group overflow-hidden"
              onClick={() => openImageGallery(galleryImages, idx + 1)}
            >
              <img src={url} alt={`${property.name} ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>
          ))}

          {displayImages[3] && (
            <div 
              className="hidden md:block relative cursor-pointer group overflow-hidden"
              onClick={() => openImageGallery(galleryImages, 3)}
            >
              <img src={displayImages[3]} alt="More" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white font-bold text-xl flex items-center gap-2">
                  <FiMaximize /> View All Photos
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Price Tag */}
        <div className="md:hidden bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{getPropertyTypeLabel(property.property_type)}</p>
            <p className="text-2xl font-display font-bold text-crimson-600">
              {property.price_label || formatPrice(property.price)}
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Key Features Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap justify-between items-center gap-4">
              {property.bedrooms !== null && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center text-navy-600">
                    <BiBed className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-navy-900">{property.bedrooms}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Bedrooms</p>
                  </div>
                </div>
              )}
              {property.bathrooms !== null && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center text-navy-600">
                    <BiBath className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-navy-900">{property.bathrooms}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Bathrooms</p>
                  </div>
                </div>
              )}
              {property.floor_area !== null && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center text-navy-600">
                    <FiHome className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-navy-900">{formatArea(property.floor_area)}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Floor Area</p>
                  </div>
                </div>
              )}
              {property.lot_area !== null && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center text-navy-600">
                    <FiMaximize className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-navy-900">{formatArea(property.lot_area)}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Lot Area</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">Property Description</h2>
              <div className="prose max-w-none text-gray-600">
                {property.description?.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Features & Amenities */}
            <div className="grid md:grid-cols-2 gap-6">
              {property.features && property.features.length > 0 && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-display font-bold text-navy-900 mb-6">Features</h2>
                  <ul className="space-y-3">
                    {property.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-600">
                        <FiCheck className="text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {property.amenities && property.amenities.length > 0 && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-display font-bold text-navy-900 mb-6">Amenities</h2>
                  <ul className="space-y-3">
                    {property.amenities.map((amenity, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-600">
                        <FiCheck className="text-crimson-500 shrink-0" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Map & Media */}
            {(property.google_map_embed || property.property_videos?.length > 0 || property.property_documents?.length > 0) && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">Location & Media</h2>
                
                {property.google_map_embed?.includes('<iframe') ? (
                  <div className="aspect-video w-full rounded-xl overflow-hidden mb-8 [&>iframe]:w-full [&>iframe]:h-full" dangerouslySetInnerHTML={{ __html: property.google_map_embed }} />
                ) : (
                  <>
                    <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 bg-gray-100 flex items-center justify-center">
                      <iframe 
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.location}, ${property.barangay}, ${property.city}, ${property.province}`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`} 
                        className="w-full h-full border-0" 
                        allowFullScreen 
                        loading="lazy" 
                      />
                    </div>
                    {property.google_map_embed?.startsWith('http') && (
                      <a href={property.google_map_embed} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-crimson-600 font-medium hover:text-crimson-700 mb-8">
                        <FiMapPin /> Open provided Google Maps link
                      </a>
                    )}
                  </>
                )}

                <div className="grid gap-6">
                  {property.property_videos?.map(video => (
                    <div key={video.id} className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-gray-200 shadow-sm">
                      {video.video_type === 'youtube' || video.url.includes('youtube.com') || video.url.includes('youtu.be') ? (
                        <iframe 
                          src={getYouTubeEmbedUrl(video.url)} 
                          className="w-full h-full" 
                          allowFullScreen
                          title={video.title || 'Property Video'}
                        />
                      ) : (
                        <video 
                          src={video.url} 
                          controls 
                          className="w-full h-full"
                          preload="metadata"
                        />
                      )}
                    </div>
                  ))}

                  <div className="grid sm:grid-cols-2 gap-4">

                  {property.property_documents?.map(doc => (
                    <a 
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-navy-500 hover:bg-navy-50 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center group-hover:bg-navy-600 group-hover:text-white transition-colors">
                        <FiFileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900">{doc.name}</p>
                        <p className="text-sm text-gray-500 group-hover:text-navy-600">Download PDF</p>
                      </div>
                    </a>
                  ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Inquiry Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">

              {/* Share Button */}
              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-700"
                onClick={handleShare}
                leftIcon={<FiShare2 />}
              >
                Share This Property
              </Button>

              {/* Inquiry Form Card */}
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-navy-900/5 border border-gray-100">
                <div className="text-center mb-5 pb-5 border-b border-gray-100">
                  <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-cream-100 shadow-lg">
                    <span className="text-crimson-500 font-display font-bold text-xl">WG</span>
                  </div>
                  <h3 className="font-display font-bold text-navy-900 text-lg">Inquire About This Property</h3>
                  <p className="text-gray-400 text-sm">{property.property_code}</p>
                </div>

                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="w-7 h-7 text-green-600" />
                    </div>
                    <h4 className="font-bold text-navy-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600 text-sm">Our team will get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-sm text-crimson-600 hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Juan Dela Cruz"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        placeholder="juan@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+63 900 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
                      <textarea
                        rows={3}
                        placeholder={`I am interested in ${property.name}...`}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      isLoading={submitInquiry.isPending}
                      rightIcon={<FiSend />}
                    >
                      Send Inquiry
                    </Button>
                  </form>
                )}

                {/* Direct Contact */}
                <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                  <a href="tel:09394934234" className="flex items-center gap-3 text-sm text-gray-600 hover:text-crimson-600 transition-colors">
                    <div className="w-8 h-8 bg-navy-50 rounded-full flex items-center justify-center">
                      <FiPhone className="w-4 h-4 text-navy-600" />
                    </div>
                    <span className="font-medium">0939 493 4234</span>
                  </a>
                  <a href="mailto:westgaterealestateserviceshr@gmail.com" className="flex items-center gap-3 text-sm text-gray-600 hover:text-crimson-600 transition-colors">
                    <div className="w-8 h-8 bg-navy-50 rounded-full flex items-center justify-center">
                      <FiMail className="w-4 h-4 text-navy-600" />
                    </div>
                    <span className="font-medium text-xs break-all">westgaterealestateserviceshr@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties && relatedProperties.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-navy-900 mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PropertyDetailPage;
