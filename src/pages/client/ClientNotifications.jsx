import { useAuth } from '../../hooks/useAuth';
import { useNotifications, useMarkNotificationRead, useMarkAllRead } from '../../hooks/useNotifications';
import { FiBell, FiCalendar, FiMessageSquare, FiInfo, FiCheck } from 'react-icons/fi';
import { Spinner } from '../../components/ui/Spinner';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const ClientNotifications = () => {
  const { user } = useAuth();
  const { data: notifications, isLoading } = useNotifications(user?.id);
  const markAsRead = useMarkNotificationRead();
  const markAllRead = useMarkAllRead();

  const handleMarkAllRead = () => {
    if (user?.id) {
      markAllRead.mutate(user.id);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'booking': return <FiCalendar className="text-blue-500" />;
      case 'inquiry': return <FiMessageSquare className="text-green-500" />;
      case 'alert': return <FiInfo className="text-red-500" />;
      default: return <FiBell className="text-crimson-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'booking': return 'bg-blue-50';
      case 'inquiry': return 'bg-green-50';
      case 'alert': return 'bg-red-50';
      default: return 'bg-cream-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with your bookings and inquiries.</p>
        </div>
        {notifications?.some(n => !n.is_read) && (
          <button 
            onClick={handleMarkAllRead}
            disabled={markAllRead.isPending}
            className="text-sm font-medium text-crimson-600 hover:text-crimson-700 flex items-center gap-2"
          >
            <FiCheck /> Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : notifications && notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-6 flex gap-4 transition-colors ${notification.is_read ? 'opacity-70 bg-white' : 'bg-gray-50/50'}`}
                onMouseEnter={() => {
                  if (!notification.is_read) markAsRead.mutate(notification.id);
                }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-base font-semibold ${notification.is_read ? 'text-navy-800' : 'text-navy-900'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {notification.message}
                  </p>

                  {notification.link && (
                    <Link 
                      to={notification.link}
                      className="text-sm font-medium text-crimson-600 hover:text-crimson-700 inline-flex items-center"
                    >
                      View Details
                    </Link>
                  )}
                </div>
                
                {!notification.is_read && (
                  <div className="shrink-0 flex items-center">
                    <div className="w-2.5 h-2.5 bg-crimson-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-display font-bold text-navy-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-500">You don't have any notifications right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNotifications;
