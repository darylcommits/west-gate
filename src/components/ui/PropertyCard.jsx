import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiMaximize, FiHome } from 'react-icons/fi';
import { BiBed, BiBath } from 'react-icons/bi';
import { formatShortPrice, getPropertyTypeLabel } from '../../lib/utils';
import { Badge, FeaturedBadge } from './Badge';

export const PropertyCard = ({ property, featured = false }) => {
  const primaryImage = property.property_images?.[0]?.url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800';

  return (
    <motion.div 
      className="property-card h-full flex flex-col group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={primaryImage} 
          alt={property.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge status={property.status} />
          {property.is_featured && <FeaturedBadge />}
        </div>
        
        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-3 bg-navy-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg font-bold shadow-lg">
          {property.price_label || formatShortPrice(property.price)}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-crimson-600 mb-2 uppercase tracking-wider">
          {getPropertyTypeLabel(property.property_type)}
        </div>
        
        <h3 className="text-lg font-display font-bold text-navy-900 mb-2 line-clamp-1 group-hover:text-crimson-600 transition-colors">
          <Link to={`/properties/${property.id}`}>
            {property.name}
          </Link>
        </h3>
        
        <div className="flex items-start gap-1.5 text-gray-500 mb-4 text-sm">
          <FiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
          <span className="line-clamp-1">{property.location}, {property.city}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-navy-700 text-sm">
          {property.bedrooms !== null && (
            <div className="flex items-center gap-1.5" title="Bedrooms">
              <BiBed className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{property.bedrooms}</span>
            </div>
          )}
          
          {property.bathrooms !== null && (
            <div className="flex items-center gap-1.5" title="Bathrooms">
              <BiBath className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{property.bathrooms}</span>
            </div>
          )}
          
          {property.floor_area !== null ? (
            <div className="flex items-center gap-1.5" title="Floor Area">
              <FiHome className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{property.floor_area} m²</span>
            </div>
          ) : property.lot_area !== null && (
            <div className="flex items-center gap-1.5" title="Lot Area">
              <FiMaximize className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{property.lot_area} m²</span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <Link 
            to={`/properties/${property.id}`}
            className="block w-full text-center py-2 bg-gray-50 hover:bg-navy-900 hover:text-white text-navy-900 rounded-lg font-medium transition-colors text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
