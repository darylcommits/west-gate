import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiPhone } from 'react-icons/fi';
import { NAV_LINKS } from '../../lib/constants';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, profile, signOut } = useAuth();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-cream-200 shadow-sm py-3 border-b border-cream-300" style={{backgroundColor:'#e8e3dd'}}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.jpg" alt="West Gate Realty Services" className="h-12 md:h-14 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium text-sm transition-colors relative group ${
                    isActive ? 'text-crimson-600' : 'text-navy-800'
                  } hover:text-crimson-600`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 transform ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform origin-left bg-crimson-600`} />
                </Link>
              );
            })}
          </nav>

          {/* Right-side CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && profile?.role === 'admin' ? (
              <>
                <Link to="/admin/dashboard">
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<FiUser />}
                  >
                    Admin Panel
                  </Button>
                </Link>
                <button
                  onClick={signOut}
                  className="text-sm font-medium transition-colors text-gray-500 hover:text-crimson-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/contact">
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<FiPhone />}
                >
                  Contact Us
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-navy-900 hover:text-crimson-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-cream-50 border-t border-cream-200 overflow-hidden shadow-xl"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block text-lg font-medium ${
                    location.pathname === link.path ? 'text-crimson-600' : 'text-navy-800 hover:text-crimson-600 transition-colors'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-cream-200 my-2" />

              {isAuthenticated && profile?.role === 'admin' ? (
                <>
                  <Link to="/admin/dashboard" className="block text-lg font-medium text-navy-800 hover:text-crimson-600 transition-colors">
                    Admin Panel
                  </Link>
                  <button
                    onClick={signOut}
                    className="text-left text-lg font-medium text-crimson-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/contact">
                  <Button variant="primary" className="w-full" leftIcon={<FiPhone />}>
                    Contact Us
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
