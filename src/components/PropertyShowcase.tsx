import React from 'react';
import AnimatedSection from './AnimatedSection';

const PropertyShowcase: React.FC = () => {
  const properties = [
    {
      title: "Agricultural Lands",
      description: "Fertile farming properties with excellent irrigation systems and strategic locations for sustainable agriculture in Ilocos.",
      image: "/assets/images/agricultural-placeholder.jpg",
      bgGradient: "from-green-400 via-green-500 to-green-600",
      features: ["Prime farming locations", "Water access", "Rich soil quality", "Government support"],
      stats: { size: "1-10 hectares", location: "Ilocos Region" }
    },
    {
      title: "Solar Farm Developments",
      description: "Cutting-edge renewable energy projects with state-of-the-art solar panel installations for sustainable power generation.",
      image: "/assets/images/solar-placeholder.jpg",
      bgGradient: "from-yellow-400 via-orange-500 to-red-500",
      features: ["High energy yield", "Government incentives", "Long-term ROI", "Environmental impact"],
      stats: { capacity: "50-500 MW", status: "Available" }
    },
    {
      title: "Commercial Properties",
      description: "Strategic commercial real estate opportunities in high-traffic areas perfect for business expansion and investment.",
      image: "/assets/images/commercial-placeholder.jpg",
      bgGradient: "from-blue-400 via-blue-500 to-blue-600",
      features: ["Prime locations", "High foot traffic", "Modern facilities", "Investment potential"],
      stats: { area: "100-1000 sqm", type: "Commercial" }
    }
  ];

  return (
    <AnimatedSection>
      <section id="properties" className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-200 to-green-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-gold-200 to-orange-200 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Featured Properties & Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exceptional real estate opportunities in Ilocos, from agricultural lands to cutting-edge solar developments
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Property Image Section */}
                <div className={`relative h-64 bg-gradient-to-br ${property.bgGradient} overflow-hidden`}>
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to gradient background with icon if image fails to load
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback icon if image doesn't load */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-8xl text-gray-500 animate-float">
                      {property.title.includes('Agricultural') ? '🌾' : 
                       property.title.includes('Solar') ? '☀️' : '🏢'}
                    </div>
                  </div>
                  
                  {/* Overlay with stats */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(property.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="font-semibold text-gray-900 capitalize">{key}</p>
                          <p className="text-gray-600">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary-900 mb-3 group-hover:text-primary-700 transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {property.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full bg-gradient-to-r ${property.bgGradient} text-white py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                    Learn More
                  </button>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Explore These Opportunities?</h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Contact our expert team to learn more about these exceptional properties and find the perfect investment for your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Schedule a Viewing
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default PropertyShowcase;
