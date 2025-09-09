import React, { useState } from 'react';
import PropertySearch from './PropertySearch';
import PropertyShowcase360 from './PropertyShowcase360';
import LeadCapture from './LeadCapture';
import MortgageCalculator from './MortgageCalculator';
import AnimatedSection from './AnimatedSection';

const PropertyListings: React.FC = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);

  return (
    <AnimatedSection>
      <section id="listings" className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Premium Property Portfolio
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover exceptional real estate opportunities in Ilocos with our advanced search tools, 
              high-quality visuals, and comprehensive property information.
            </p>
          </div>

          {/* Advanced Search Component */}
          <div className="mb-12">
            <PropertySearch />
          </div>

          {/* Featured Properties Showcase */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-primary-900">Featured Properties</h3>
              <button
                onClick={() => setShowLeadForm(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Get Property Alerts
              </button>
            </div>
            <PropertyShowcase360 />
          </div>

          {/* Property Statistics */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-primary-900 mb-6 text-center">Market Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-1">150+</div>
                <div className="text-gray-600">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-1">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="bg-gold-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-gold-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-1">25+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-1">12</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
            </div>
          </div>

          {/* Property Types Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary-900 mb-8 text-center">Browse by Property Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { type: 'Residential', count: '45', icon: '🏠', color: 'from-blue-500 to-blue-600' },
                { type: 'Agricultural', count: '28', icon: '🌾', color: 'from-green-500 to-green-600' },
                { type: 'Commercial', count: '33', icon: '🏢', color: 'from-purple-500 to-purple-600' },
                { type: 'Solar Projects', count: '12', icon: '☀️', color: 'from-yellow-500 to-orange-600' }
              ].map((category, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className={`bg-gradient-to-br ${category.color} rounded-xl p-6 text-white transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h4 className="text-lg font-semibold mb-2">{category.type}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-90">{category.count} Properties</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhood Highlights */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-primary-900 mb-8 text-center">Popular Neighborhoods</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Vigan Heritage District',
                  description: 'Historic charm meets modern living',
                  highlights: ['UNESCO World Heritage Site', 'Tourist attractions', 'Cultural significance', 'Investment potential'],
                  image: '/api/placeholder/400/300?text=Vigan+Heritage'
                },
                {
                  name: 'Laoag Business Center',
                  description: 'Prime commercial and residential hub',
                  highlights: ['Business district', 'Modern amenities', 'Transportation links', 'Growth potential'],
                  image: '/api/placeholder/400/300?text=Laoag+Business'
                },
                {
                  name: 'Candon Coastal Area',
                  description: 'Beachfront living and eco-tourism',
                  highlights: ['Beach access', 'Natural beauty', 'Eco-friendly developments', 'Resort potential'],
                  image: '/api/placeholder/400/300?text=Candon+Coastal'
                }
              ].map((neighborhood, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img 
                      src={neighborhood.image} 
                      alt={neighborhood.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="%236b7280" font-size="16">${neighborhood.name}</text></svg>`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <button className="w-full bg-white text-primary-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                          Explore Area
                        </button>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-primary-900 mb-2">{neighborhood.name}</h4>
                  <p className="text-gray-600 mb-3">{neighborhood.description}</p>
                  <div className="space-y-1">
                    {neighborhood.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mortgage Calculator */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">Calculate Your Investment</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Use our mortgage calculator to plan your property purchase and understand your financing options.
              </p>
            </div>
            <MortgageCalculator />
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Property?</h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Our property experts are here to help you navigate the Ilocos real estate market and find the perfect investment or home.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
                >
                  Schedule Consultation
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all transform hover:scale-105">
                  Browse All Listings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Capture Modal */}
        {showLeadForm && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
              <LeadCapture
                variant="modal"
                title="Get Personalized Property Recommendations"
                subtitle="Tell us about your preferences and we'll send you matching properties"
                onClose={() => setShowLeadForm(false)}
              />
            </div>
          </div>
        )}
      </section>
    </AnimatedSection>
  );
};

export default PropertyListings;
