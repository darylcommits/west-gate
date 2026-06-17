import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome, FiFileText, FiMap, FiClipboard, FiRepeat,
  FiShield, FiSearch, FiLayers, FiGrid, FiTool,
  FiHardDrive, FiNavigation, FiBarChart2, FiBook,
  FiMessageCircle, FiCheckCircle, FiArrowRight
} from 'react-icons/fi';

const SERVICES = [
  {
    icon: FiHome,
    title: 'Real Estate Brokerage & Marketing',
    description: 'Professional property marketing and brokerage services to connect buyers and sellers efficiently across Ilocos Norte.',
    color: 'from-navy-900 to-navy-700',
  },
  {
    icon: FiRepeat,
    title: 'Property Selling and Buying Assistance',
    description: 'End-to-end guidance whether you are buying your dream home or selling your property at the best value.',
    color: 'from-crimson-600 to-crimson-800',
  },
  {
    icon: FiMap,
    title: 'Land Acquisition Services',
    description: 'Expert assistance in identifying, evaluating, and acquiring land properties that meet your investment goals.',
    color: 'from-navy-800 to-navy-600',
  },
  {
    icon: FiFileText,
    title: 'Property Documentation Assistance',
    description: 'Comprehensive support in preparing, reviewing, and processing all required property documents.',
    color: 'from-crimson-700 to-crimson-500',
  },
  {
    icon: FiClipboard,
    title: 'Transfer of Title Processing',
    description: 'Seamless processing of title transfers through BIR, Registry of Deeds, and the Assessor\'s Office on your behalf.',
    color: 'from-navy-900 to-navy-700',
  },
  {
    icon: FiShield,
    title: 'DAR & DENR Assistance',
    description: 'Specialist assistance with Department of Agrarian Reform and DENR requirements, clearances, and compliance.',
    color: 'from-crimson-600 to-crimson-800',
  },
  {
    icon: FiSearch,
    title: 'Property Due Diligence and Verification',
    description: 'Thorough verification of property titles, encumbrances, and legal standing to protect your investment.',
    color: 'from-navy-800 to-navy-600',
  },
  {
    icon: FiLayers,
    title: 'Reclassification & Land Conversion Assistance',
    description: 'Guidance through the process of land reclassification and agricultural-to-residential or commercial conversion.',
    color: 'from-crimson-700 to-crimson-500',
  },
  {
    icon: FiGrid,
    title: 'Survey and Subdivision Coordination',
    description: 'Coordination with licensed geodetic engineers for property surveys, lot splitting, and subdivision planning.',
    color: 'from-navy-900 to-navy-700',
  },
  {
    icon: FiTool,
    title: 'Building Permit Processing Assistance',
    description: 'Assistance in preparing requirements and processing building permits with the local government unit.',
    color: 'from-crimson-600 to-crimson-800',
  },
  {
    icon: FiHardDrive,
    title: 'Construction & Pabakod Services',
    description: 'Support for construction projects including fencing (pabakod) coordination and contractor referrals.',
    color: 'from-navy-800 to-navy-600',
  },
  {
    icon: FiNavigation,
    title: 'Access Road Assistance',
    description: 'Help in establishing legal access roads and easements to ensure your property has proper ingress and egress.',
    color: 'from-crimson-700 to-crimson-500',
  },
  {
    icon: FiBarChart2,
    title: 'Property Valuation Assistance',
    description: 'Market-based property valuation to help you price or evaluate properties accurately and competitively.',
    color: 'from-navy-900 to-navy-700',
  },
  {
    icon: FiBook,
    title: 'Publication and Legal Processing Assistance',
    description: 'Assistance in legal notice publications and processing requirements for various real estate transactions.',
    color: 'from-crimson-600 to-crimson-800',
  },
  {
    icon: FiMessageCircle,
    title: 'Real Estate Consultation',
    description: 'One-on-one professional consultations to help you make informed decisions about buying, selling, or investing in real estate.',
    color: 'from-navy-800 to-navy-600',
  },
  {
    icon: FiCheckCircle,
    title: 'Assistance in Securing Government Clearances and Permits',
    description: 'Full assistance in securing all necessary government clearances and permits required for your real estate transactions.',
    color: 'from-crimson-700 to-crimson-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO */}
      <title>Our Services | West Gate Realty Services</title>
      <meta name="description" content="Explore the full range of real estate services offered by West Gate Realty Services in Ilocos Norte — from property buying and selling to title transfer, DAR/DENR assistance, and more." />

      {/* Hero Section */}
      <section className="relative bg-navy-900 overflow-hidden py-24 md:py-32">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-crimson-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-navy-500/30 blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-crimson-500/20 text-crimson-300 text-sm font-semibold tracking-wider uppercase mb-6 border border-crimson-500/30">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Comprehensive<br />
              <span className="text-crimson-400">Real Estate Services</span>
            </h1>
            <p className="text-navy-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              From property acquisition to title transfer, we provide end-to-end real estate solutions tailored to your needs across Ilocos Norte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-4">
              Our Full Range of Services
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We offer 16 specialized services to guide you through every step of your real estate journey.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-navy-900 text-base mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-navy-900 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-navy-300 text-lg mb-8 max-w-xl mx-auto">
              Contact us today and let our team of experienced real estate professionals guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-crimson-600 hover:bg-crimson-700 text-white font-semibold rounded-xl transition-colors duration-200 text-base"
              >
                Contact Us Now <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors duration-200 text-base"
              >
                View Properties <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
