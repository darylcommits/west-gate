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
