import React from 'react';
import AnimatedSection from './AnimatedSection';

const CertificationsSection: React.FC = () => {
  return (
    <AnimatedSection>
      <section id="certifications" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">LEGITIMACY CERTIFICATIONS</h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            {/* DTI Certificate */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-8 mb-8 border-l-4 border-green-500">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">
                    Department of Trade and Industry (DTI) Certificate
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Business Name:</strong> WEST GATE REALTY SERVICES (NATIONAL)</p>
                    <p><strong>Registered to:</strong> JONATHAN ROCERO RABANAL</p>
                    <p><strong>Business Name No.:</strong> 7087904</p>
                    <p><strong>Valid from:</strong> 15 April 2025 to 15 April 2030</p>
                    <p><strong>Certificate ID:</strong> WXYZ93511759066</p>
                  </div>
                </div>
                <div className="md:w-1/3 mt-6 md:mt-0">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🏛️</div>
                      <p className="text-sm font-semibold text-green-600">DTI CERTIFIED</p>
                      <p className="text-xs text-gray-500">Business Registration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRC Accreditation */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 border-l-4 border-blue-500">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  Professional Regulation Commission (PRC) Accreditation
                </h3>
                <div className="max-w-2xl mx-auto">
                  <p className="text-gray-700 mb-4">
                    <strong>Jonathan Rocero Rabanal</strong><br />
                    PRC Accreditation No. 22818
                  </p>
                  <p className="text-sm text-gray-600">
                    Handled by PRC-accredited professionals you can trust
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <div className="text-3xl mb-2">🎓</div>
                      <p className="text-sm font-semibold text-blue-600">PRC ACCREDITED</p>
                      <p className="text-xs text-gray-500">Professional License</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Permits */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                <h4 className="text-lg font-semibold text-primary-900 mb-3">Service Offerings Include:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Land Acquisition</li>
                  <li>✓ Land Due Diligence</li>
                  <li>✓ Land Reclassification</li>
                  <li>✓ Municipal & Brgy. Endorsement</li>
                  <li>✓ LGU Local Building Permits</li>
                  <li>✓ Access Roads</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                <h4 className="text-lg font-semibold text-primary-900 mb-3">Additional Services:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Building Permit</li>
                  <li>✓ Locational Clearance</li>
                  <li>✓ Excavation & Ground Clearance</li>
                  <li>✓ Electrical Permit</li>
                  <li>✓ Sanitary Permit</li>
                  <li>✓ Fire Safety Clearance</li>
                  <li>✓ Occupancy Permit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default CertificationsSection;
