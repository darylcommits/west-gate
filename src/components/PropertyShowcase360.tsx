import React, { useState } from 'react';

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  area: string;
  description: string;
  features: string[];
  images: PropertyImage[];
  virtualTour?: string;
  droneFootage?: string;
  floorPlan?: string;
}

interface PropertyImage {
  url: string;
  alt: string;
  type: 'main' | 'gallery' | 'drone' | 'floor_plan';
}

const PropertyShowcase360: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'gallery' | 'virtual' | 'drone' | 'floor'>('gallery');

  // Sample property data - in real implementation, this would come from your API/CRM
  const properties: Property[] = [
    {
      id: 'prop-001',
      title: 'Modern Luxury Villa',
      type: 'Residential',
      location: 'Vigan Heritage District',
      price: 'Contact for pricing',
      bedrooms: 5,
      bathrooms: 4,
      area: '350 sqm',
      description: 'Stunning modern villa combining contemporary design with traditional Filipino architecture. Features premium finishes, smart home technology, and panoramic city views.',
      features: [
        'Smart Home System',
        'Infinity Pool',
        'Roof Deck',
        'Wine Cellar',
        'Home Theater',
        'Solar Panels',
        'Security System',
        'Landscaped Garden'
      ],
      images: [
        { url: '/api/placeholder/800/600?text=Villa+Exterior', alt: 'Villa exterior view', type: 'main' },
        { url: '/api/placeholder/800/600?text=Living+Room', alt: 'Spacious living room', type: 'gallery' },
        { url: '/api/placeholder/800/600?text=Master+Bedroom', alt: 'Master bedroom suite', type: 'gallery' },
        { url: '/api/placeholder/800/600?text=Kitchen', alt: 'Modern kitchen', type: 'gallery' },
        { url: '/api/placeholder/800/600?text=Pool+Area', alt: 'Pool and outdoor area', type: 'gallery' },
        { url: '/api/placeholder/800/600?text=Aerial+View', alt: 'Drone aerial view', type: 'drone' },
        { url: '/api/placeholder/800/600?text=Floor+Plan', alt: 'Property floor plan', type: 'floor_plan' }
      ],
      virtualTour: 'https://example.com/virtual-tour-001',
      droneFootage: 'https://example.com/drone-video-001',
      floorPlan: '/api/placeholder/800/600?text=Detailed+Floor+Plan'
    },
    {
      id: 'prop-002',
      title: 'Prime Agricultural Land',
      type: 'Agricultural',
      location: 'Bantay, Ilocos Sur',
      price: 'Contact for pricing',
      area: '5 hectares',
      description: 'Fertile agricultural land with established irrigation system, perfect for rice farming and crop cultivation. Includes farm equipment storage and processing facilities.',
      features: [
        'Irrigation System',
        'Storage Facilities',
        'Equipment Shed',
        'Access Road',
        'Water Rights',
        'Fertile Soil',
        'Flat Terrain',
        'Government Support'
      ],
      images: [
        { url: '/api/placeholder/800/600?text=Rice+Fields', alt: 'Lush rice fields', type: 'main' },
        { url: '/api/placeholder/800/600?text=Irrigation+Canal', alt: 'Irrigation system', type: 'gallery' },
        { url: '/api/placeholder/800/600?text=Farm+Equipment', alt: 'Farm storage area', type: 'gallery' },
        { url: '/api/placeholder/800/600?text=Access+Road', alt: 'Property access road', type: 'gallery' },
        { url: '/api/placeholder/800/600?text=Aerial+Farmland', alt: 'Aerial view of farmland', type: 'drone' }
      ],
      droneFootage: 'https://example.com/drone-farm-001'
    },
    {
      id: 'prop-003',
      title: 'Solar Farm Investment',
      type: 'Solar Project',
      location: 'Candon City, Ilocos Sur',
      price: 'Contact for pricing',
      area: '25 MW capacity',
      description: 'State-of-the-art solar farm with high-efficiency panels and grid connection. Fully operational with guaranteed power purchase agreement.',
      features: [
        '25 MW Capacity',
        'Grid Connected',
        'Power Purchase Agreement',
        'Monitoring System',
        'Maintenance Facility',
        'Security Fencing',
        'Access Roads',
        'Environmental Compliance'
      ],
      images: [
        { url: '/api/placeholder/800/600?text=Solar+Panels', alt: 'Solar panel arrays', type: 'main' },
        { url: '/api/placeholder/800/600?text=Control+Room', alt: 'Monitoring control room', type: 'gallery' },
        { url: '/api/placeholder/800/600?text=Grid+Connection', alt: 'Grid connection facility', type: 'gallery' },
        { url: '/api/placeholder/800/600?text=Maintenance', alt: 'Maintenance area', type: 'gallery' },
        { url: '/api/placeholder/800/600?text=Aerial+Solar', alt: 'Aerial view of solar farm', type: 'drone' }
      ],
      droneFootage: 'https://example.com/drone-solar-001'
    }
  ];

  const nextImage = () => {
    if (selectedProperty) {
      const galleryImages = selectedProperty.images.filter(img => 
        viewMode === 'gallery' ? img.type === 'main' || img.type === 'gallery' :
        viewMode === 'drone' ? img.type === 'drone' :
        img.type === 'floor_plan'
      );
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedProperty) {
      const galleryImages = selectedProperty.images.filter(img => 
        viewMode === 'gallery' ? img.type === 'main' || img.type === 'gallery' :
        viewMode === 'drone' ? img.type === 'drone' :
        img.type === 'floor_plan'
      );
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const openPropertyDetails = (property: Property) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
    setViewMode('gallery');
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setCurrentImageIndex(0);
  };

  const getCurrentImages = () => {
    if (!selectedProperty) return [];
    return selectedProperty.images.filter(img => 
      viewMode === 'gallery' ? img.type === 'main' || img.type === 'gallery' :
      viewMode === 'drone' ? img.type === 'drone' :
      img.type === 'floor_plan'
    );
  };

  return (
    <div>
      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
            {/* Property Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={property.images[0]?.url}
                alt={property.images[0]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23f3f4f6"/><text x="400" y="300" text-anchor="middle" fill="%236b7280" font-size="24">${property.title}</text></svg>`;
                }}
              />
              
              {/* Property Type Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {property.type}
                </span>
              </div>

              {/* View Options */}
              <div className="absolute top-4 right-4 flex space-x-2">
                {property.virtualTour && (
                  <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                )}
                {property.droneFootage && (
                  <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 110 2h-1v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6H4a1 1 0 110-2h3z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <button
                    onClick={() => openPropertyDetails(property)}
                    className="w-full bg-white text-primary-900 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    View Details & Virtual Tour
                  </button>
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-2">{property.title}</h3>
              <p className="text-gray-600 flex items-center mb-3">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {property.location}
              </p>

              {/* Property Stats */}
              <div className="flex flex-wrap gap-4 mb-4">
                {property.bedrooms && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">{property.bedrooms}</span>
                    <span className="ml-1">BR</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">{property.bathrooms}</span>
                    <span className="ml-1">BA</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">{property.area}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {property.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-900">
                  {property.price}
                </span>
                <button
                  onClick={() => openPropertyDetails(property)}
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary-900">{selectedProperty.title}</h2>
                <p className="text-gray-600">{selectedProperty.location}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* View Mode Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => { setViewMode('gallery'); setCurrentImageIndex(0); }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'gallery' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📸 Photo Gallery
                </button>
                {selectedProperty.virtualTour && (
                  <button
                    onClick={() => setViewMode('virtual')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === 'virtual' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🥽 Virtual Tour
                  </button>
                )}
                {selectedProperty.droneFootage && (
                  <button
                    onClick={() => { setViewMode('drone'); setCurrentImageIndex(0); }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === 'drone' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🚁 Drone View
                  </button>
                )}
                {selectedProperty.floorPlan && (
                  <button
                    onClick={() => { setViewMode('floor'); setCurrentImageIndex(0); }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === 'floor' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📐 Floor Plan
                  </button>
                )}
              </div>

              {/* Content Area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Media Display */}
                <div>
                  {viewMode === 'virtual' && selectedProperty.virtualTour ? (
                    <div className="bg-gray-100 rounded-xl p-8 text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">360° Virtual Tour</h3>
                      <p className="text-gray-600 mb-4">Experience this property from every angle</p>
                      <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                        Launch Virtual Tour
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      {(() => {
                        const currentImages = getCurrentImages();
                        if (currentImages.length === 0) return null;
                        
                        return (
                          <>
                            <img
                              src={currentImages[currentImageIndex]?.url}
                              alt={currentImages[currentImageIndex]?.alt}
                              className="w-full h-96 object-cover rounded-xl"
                              onError={(e) => {
                                e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23f3f4f6"/><text x="400" y="300" text-anchor="middle" fill="%236b7280" font-size="24">Image Not Available</text></svg>`;
                              }}
                            />
                            
                            {currentImages.length > 1 && (
                              <>
                                <button
                                  onClick={prevImage}
                                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                  </svg>
                                </button>
                                <button
                                  onClick={nextImage}
                                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                                
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                  {currentImages.map((_, index) => (
                                    <button
                                      key={index}
                                      onClick={() => setCurrentImageIndex(index)}
                                      className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-primary-900 mb-3">Property Details</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProperty.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-primary-900 mb-3">Features & Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProperty.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Property Stats */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h4 className="text-lg font-semibold text-primary-900 mb-3">Property Information</h4>
                    <div className="space-y-2">
                      {selectedProperty.bedrooms && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bedrooms:</span>
                          <span className="font-medium">{selectedProperty.bedrooms}</span>
                        </div>
                      )}
                      {selectedProperty.bathrooms && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bathrooms:</span>
                          <span className="font-medium">{selectedProperty.bathrooms}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-medium">{selectedProperty.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedProperty.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Request More Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyShowcase360;
