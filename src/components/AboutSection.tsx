import React from 'react';
import AnimatedSection from './AnimatedSection';

const AboutSection: React.FC = () => {
  return (
    <AnimatedSection>
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">ABOUT US</h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              West Gate Realty Services is dedicated to helping clients with all their real estate needs. 
              Whether you're buying, selling, renting, or managing property, we provide expert guidance 
              and personalized service to ensure a smooth transaction.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center group transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 animate-float">
                  <svg className="w-10 h-10 text-primary-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.8 9 10 5.16-.2 9-4.45 9-10V7l-10-5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">Trusted</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">Licensed and accredited professionals you can trust</p>
              </div>
              <div className="text-center group transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-gold-100 to-gold-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 animate-float animation-delay-1000">
                  <svg className="w-10 h-10 text-gold-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">Professional</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">Personalized and honest client support</p>
              </div>
              <div className="text-center group transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 animate-float animation-delay-2000">
                  <svg className="w-10 h-10 text-green-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">Reliable</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">Fast and reliable document processing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default AboutSection;
