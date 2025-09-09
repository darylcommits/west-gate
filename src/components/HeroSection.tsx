import React from 'react';

const HeroSection: React.FC = () => {
  return (
        <section
          id="home"
          className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-green-50 overflow-hidden pt-20"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 74, 110, 0.1), rgba(12, 74, 110, 0.2)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><path fill="%23059669" fill-opacity="0.05" d="M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z"/></svg>')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/80 to-green-50/80"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary-200 to-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-gold-200 to-primary-200 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-1000"></div>
      
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center animate-fade-in mt-8">
                <h1 className="text-4xl md:text-6xl font-bold text-primary-900 mb-6">
                  WEST GATE
                  <span className="block text-gold-500">REALTY SERVICES</span>
                </h1>
          <p className="text-2xl md:text-3xl text-primary-700 mb-8 italic">
            Turning Dreams to Reality
          </p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            West Gate Realty Services is your all-in-one real estate partner in Ilocos! 
            We are proud to offer professional, honest, and complete real estate services, 
            in collaboration with a licensed broker and partner attorney.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center">
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('about');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center">
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
          
          {/* Property Images Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <button 
              onClick={() => {
                const element = document.getElementById('properties');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">🌾</div>
                  <p className="font-semibold">Agricultural Land</p>
                  <p className="text-sm opacity-90">Prime farming properties</p>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                      View Properties →
                    </span>
                  </div>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => {
                const element = document.getElementById('properties');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">☀️</div>
                  <p className="font-semibold">Solar Developments</p>
                  <p className="text-sm opacity-90">Sustainable energy projects</p>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                      Explore Projects →
                    </span>
                  </div>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500 md:col-span-2 lg:col-span-1 cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center relative z-10">
                <div className="text-center text-white relative z-20">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">🏡</div>
                  <p className="font-semibold text-white">Residential Properties</p>
                  <p className="text-sm opacity-90 text-white">Dream homes in Ilocos</p>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium text-white">
                      Contact Us →
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
