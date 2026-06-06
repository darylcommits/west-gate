import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ADMIN_NAV_LINKS } from '../../lib/constants';
import { useUiStore } from '../../store/uiStore';
import { FiMenu, FiBell } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
  const { setSidebarCollapsed } = useUiStore();
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar links={ADMIN_NAV_LINKS} basePath="/admin" />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarCollapsed(false)}
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-display font-semibold text-navy-900 hidden sm:block">Admin Portal</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-navy-900 transition-colors">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-crimson-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-navy-900 leading-none">{profile?.full_name}</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
