import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiAward, FiUsers, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-24 bg-navy-900 overflow-hidden mt-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Office Building" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              About West Gate Realty Services
            </h1>
            <p className="text-xl text-cream-50/80 max-w-3xl mx-auto leading-relaxed">
              Turning Dreams to Reality
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Company Profile */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-8">Company Profile</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                West Gate Realty Services is a dedicated real estate company offering comprehensive property solutions to individuals, families, and investors across Ilocos and beyond.
              </p>
              <p>
                We specialize in property sales, assistance with title transfers, real estate documentation, and buyer-seller coordination.
              </p>
              <p className="font-semibold text-navy-900">
                With a mission to turn real estate dreams into reality, we ensure every transaction is transparent, smooth, and trustworthy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Services List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-crimson-600 tracking-wider uppercase mb-2">What We Do</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-navy-900">Our Services</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="bg-cream-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-xl font-bold text-navy-900 mb-4 border-b border-gray-200 pb-3">1. Property Listing and Sales</h4>
              <ul className="space-y-2 mb-4 text-gray-600">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-crimson-500 shrink-0" /> Residential properties</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-crimson-500 shrink-0" /> Agricultural properties</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-crimson-500 shrink-0" /> Commercial properties</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-crimson-500 shrink-0" /> Beachfront properties</li>
              </ul>
              <div className="text-sm text-gray-500 pt-3 border-t border-gray-200">
                <strong>Services include:</strong> Wide advertising reach via online platforms and local marketing. Assistance in pricing, viewing, and negotiations.
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-cream-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-xl font-bold text-navy-900 mb-4 border-b border-gray-200 pb-3">2. Document Assistance & Preparation</h4>
              <ul className="space-y-2 mb-4 text-gray-600">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-crimson-500 shrink-0" /> Authority to Sell (ATS)</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-crimson-500 shrink-0" /> Special Power of Attorney (SPA)</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-crimson-500 shrink-0" /> Deed of Sale</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-crimson-500 shrink-0" /> Lease Contracts</li>
              </ul>
              <div className="text-sm text-gray-500 pt-3 border-t border-gray-200">
                <strong>Additional services:</strong> Notarization support, Legal review guidance.
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-cream-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-xl font-bold text-navy-900 mb-4 border-b border-gray-200 pb-3">3. Title Transfer Services</h4>
              <ul className="space-y-2 mb-4 text-gray-600 text-sm">
                <li>Capital Gains Tax (CGT) computation</li>
                <li>Documentary Stamp Tax (DST) computation</li>
                <li>Transfer Tax computation</li>
              </ul>
              <div className="text-sm text-gray-500 pt-3 border-t border-gray-200">
                <strong>Coordination with:</strong> BIR, Registry of Deeds, Municipal Assessor, Treasurer's Office.
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-cream-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-xl font-bold text-navy-900 mb-4 border-b border-gray-200 pb-3">4. Buyer and Seller Representation</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2"><FiCheckCircle className="text-crimson-500 shrink-0 mt-1" /> Accredited Real Estate Salesperson representation</li>
                <li className="flex items-start gap-2"><FiCheckCircle className="text-crimson-500 shrink-0 mt-1" /> Authorized coordination through signed ATS or SPA</li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="bg-cream-50 p-8 rounded-2xl border border-gray-100 shadow-sm md:col-span-2 lg:col-span-1">
              <h4 className="text-xl font-bold text-navy-900 mb-4 border-b border-gray-200 pb-3">5. Real Estate Advisory</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2"><FiCheckCircle className="text-crimson-500 shrink-0 mt-1" /> Guidance on land development</li>
                <li className="flex items-start gap-2"><FiCheckCircle className="text-crimson-500 shrink-0 mt-1" /> Property potential assessment</li>
                <li className="flex items-start gap-2"><FiCheckCircle className="text-crimson-500 shrink-0 mt-1" /> Investment return analysis</li>
                <li className="flex items-start gap-2"><FiCheckCircle className="text-crimson-500 shrink-0 mt-1" /> Risk analysis and due diligence for problematic lots or inherited properties</li>
              </ul>
            </div>

            {/* Services Offered - Extras */}
            <div className="bg-navy-900 p-8 rounded-2xl shadow-xl text-white md:col-span-2 lg:col-span-1">
              <h4 className="text-xl font-bold text-crimson-500 mb-4 border-b border-navy-700 pb-3">Additional Services</h4>
              
              <h5 className="font-semibold mb-2">Land Services:</h5>
              <ul className="space-y-1 mb-4 text-sm text-cream-50/80">
                <li>• Land Acquisition & Due Diligence</li>
                <li>• Land Reclassification & Conversion</li>
                <li>• Municipal & Barangay Endorsement</li>
                <li>• LGU Local Building Permits</li>
                <li>• Access Roads</li>
              </ul>

              <h5 className="font-semibold mb-2">Permit & Construction Services:</h5>
              <ul className="space-y-1 text-sm text-cream-50/80">
                <li>• Building Permit</li>
                <li>• Locational Clearance</li>
                <li>• Excavation & Ground Clearance</li>
                <li>• Electrical & Sanitary Permits</li>
                <li>• Fire Safety & Occupancy Permits</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-cream-50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-12">Why Choose West Gate Realty Services?</h2>
          
          <div className="grid sm:grid-cols-2 gap-6 text-left mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4">
              <FiAward className="w-8 h-8 text-crimson-600 shrink-0" />
              <div>
                <h4 className="font-bold text-navy-900 mb-1">Licensed Professionals</h4>
                <p className="text-sm text-gray-600">Licensed and accredited professionals.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4">
              <FiUsers className="w-8 h-8 text-crimson-600 shrink-0" />
              <div>
                <h4 className="font-bold text-navy-900 mb-1">Honest Support</h4>
                <p className="text-sm text-gray-600">Personalized and honest client support.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4">
              <FiTarget className="w-8 h-8 text-crimson-600 shrink-0" />
              <div>
                <h4 className="font-bold text-navy-900 mb-1">Fast Processing</h4>
                <p className="text-sm text-gray-600">Fast and reliable document processing.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4">
              <FiEye className="w-8 h-8 text-crimson-600 shrink-0" />
              <div>
                <h4 className="font-bold text-navy-900 mb-1">Local Expertise</h4>
                <p className="text-sm text-gray-600">Deep understanding of the Ilocos property market.</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-display font-bold text-navy-900 mb-4">Let us be your trusted partner in property.</h3>
          <p className="text-lg text-gray-600">
            West Gate Realty Services is committed to helping you every step of the way in buying, selling, and securing your future through real estate.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
