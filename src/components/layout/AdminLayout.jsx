import { useState, useRef, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ADMIN_NAV_LINKS } from '../../lib/constants';
import { useUiStore } from '../../store/uiStore';
import { FiMenu, FiBell, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications, useUnreadCount, useMarkNotificationRead, useMarkAllRead } from '../../hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const NotificationBell = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { data: notifications = [] } = useNotifications(userId);
  const { data: unreadCount = 0 } = useUnreadCount(userId);
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllRead();

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNotifClick = async (notif) => {
    if (!notif.is_read) {
      await markRead.mutateAsync(notif.id);
    }
    setOpen(false);
    if (notif.link) navigate(notif.link);
  };

  const handleMarkAll = async () => {
    await markAll.mutateAsync(userId);
  };

  const typeColors = {
    booking: 'bg-blue-100 text-blue-600',
    inquiry: 'bg-amber-100 text-amber-600',
    system: 'bg-purple-100 text-purple-600',
    alert: 'bg-crimson-100 text-crimson-600',
    info: 'bg-gray-100 text-gray-600',
  };

  const typeIcons = {
    booking: '📅',
    inquiry: '✉️',
    system: '⚙️',
    alert: '🔔',
    info: 'ℹ️',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(o => !o)}
        className="relative p-2 text-gray-400 hover:text-navy-900 transition-colors rounded-lg hover:bg-gray-100"
      >
        <FiBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-crimson-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white leading-none px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-navy-900 text-sm">
              Notifications {unreadCount > 0 && <span className="ml-1 text-crimson-500">({unreadCount} new)</span>}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAll}
                className="flex items-center gap-1 text-xs text-navy-600 hover:text-crimson-600 font-medium transition-colors"
              >
                <FiCheck className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto custom-scrollbar divide-y divide-gray-50">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">
                No notifications yet
              </div>
            ) : (
              notifications.slice(0, 15).map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => handleNotifClick(notif)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 ${!notif.is_read ? 'bg-blue-50/40' : ''}`}
                >
                  <span className="text-lg shrink-0">{typeIcons[notif.type] || '🔔'}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-snug ${!notif.is_read ? 'font-semibold text-navy-900' : 'font-medium text-gray-700'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  {!notif.is_read && (
                    <span className="w-2 h-2 bg-crimson-500 rounded-full shrink-0 mt-1.5" />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t border-gray-100 text-center">
              <Link
                to="/admin/inquiries"
                onClick={() => setOpen(false)}
                className="text-xs text-navy-600 hover:text-crimson-600 font-medium transition-colors"
              >
                View all inquiries →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
          
          <div className="flex items-center gap-3">
            {profile?.id && <NotificationBell userId={profile.id} />}
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
