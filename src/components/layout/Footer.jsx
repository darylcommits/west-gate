import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { NAV_LINKS } from '../../lib/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-cream-50 pt-16 pb-8 border-t-[6px] border-crimson-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.jpg" alt="West Gate Realty Services" className="h-16 object-contain rounded-lg" />
            </Link>
            <p className="text-cream-50/70 text-sm mb-6 leading-relaxed">
              Your Full-Package Real Estate Marketing & Transaction Management Partner in Ilocos Region. We provide strategic, professional, and end-to-end solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-white hover:bg-crimson-600 transition-colors">
                <FiFacebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-white hover:bg-crimson-600 transition-colors">
                <FiInstagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-white hover:bg-crimson-600 transition-colors">
                <FiTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-crimson-600"></span>
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-cream-50/70 hover:text-crimson-500 transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson-600"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-6 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-crimson-600"></span>
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="text-cream-50/70 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson-500"></span>
                Strategic Property Marketing
              </li>
              <li className="text-cream-50/70 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson-500"></span>
                Client–Property Matching
              </li>
              <li className="text-cream-50/70 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson-500"></span>
                End-to-End Processing
              </li>
              <li className="text-cream-50/70 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson-500"></span>
                Real Estate Investment
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-crimson-600"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cream-200/80">
                <FiMapPin className="text-crimson-500 mt-1 flex-shrink-0" />
                <span>Cabigbigaan, Santo Domingo, Ilocos Sur</span>
              </li>
              <li className="flex items-center gap-3 text-cream-200/80">
                <FiPhone className="text-crimson-500 flex-shrink-0" />
                <span>0939 493 4234</span>
              </li>
              <li className="flex items-center gap-3 text-cream-200/80">
                <FiMail className="text-crimson-500 flex-shrink-0" />
                <a href="mailto:westgaterealestateserviceshr@gmail.com" className="hover:text-white transition-colors">
                  westgaterealestateserviceshr@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-navy-800 text-center md:flex md:justify-between md:items-center text-sm text-cream-50/50">
          <p>&copy; {currentYear} West Gate Realty Services. All rights reserved.</p>
          <div className="flex gap-4 justify-center mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
