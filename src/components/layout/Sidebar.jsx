import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useUiStore } from '../../store/uiStore';
import { useAuth } from '../../hooks/useAuth';
import * as Icons from 'react-icons/fi';
import { Button } from '../ui/Button';

export const Sidebar = ({ links, basePath }) => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useUiStore();
  const { profile, signOut } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-navy-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: sidebarCollapsed ? '0px' : '280px',
          x: sidebarCollapsed ? '-100%' : '0%'
        }}
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen z-50 bg-white border-r border-gray-100 flex flex-col transition-all duration-300 shadow-xl lg:shadow-none",
          sidebarCollapsed ? "lg:w-20 lg:translate-x-0" : ""
        )}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 shrink-0">
          {!sidebarCollapsed && (
            <Link to="/" className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
              <img src="/logo.jpg" alt="West Gate Realty Services" className="h-10 object-contain rounded-md" />
            </Link>
          )}
          
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-navy-900 transition-colors ml-auto"
          >
            <Icons.FiMenu className="w-5 h-5" />
          </button>
        </div>

        {/* User Info (if expanded) */}
        {!sidebarCollapsed && profile && (
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center overflow-hidden shrink-0 border-2 border-white shadow-sm">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                ) : (
                  <Icons.FiUser className="w-5 h-5 text-navy-600" />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-navy-900 truncate">{profile.full_name}</p>
                <p className="text-xs text-gray-500 capitalize">{profile.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
          <nav className="flex flex-col gap-2">
            {links.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              const Icon = Icons[link.icon];

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-cream-100 text-crimson-600 font-medium" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-navy-900",
                    sidebarCollapsed ? "justify-center px-0 lg:px-0" : ""
                  )}
                  title={sidebarCollapsed ? link.name : undefined}
                >
                  <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-crimson-600" : "text-gray-400 group-hover:text-navy-600")} />
                  {!sidebarCollapsed && <span className="whitespace-nowrap">{link.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <Button 
            variant="ghost" 
            className={cn("w-full text-red-600 hover:text-red-700 hover:bg-red-50", sidebarCollapsed ? "px-0" : "px-4 justify-start")}
            onClick={() => signOut()}
            leftIcon={<Icons.FiLogOut />}
            title={sidebarCollapsed ? "Sign Out" : undefined}
          >
            {!sidebarCollapsed && "Sign Out"}
          </Button>
        </div>
      </motion.aside>
    </>
  );
};
