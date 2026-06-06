import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useClientBookings } from '../../hooks/useBookings';
import { useFavorites } from '../../hooks/useFavorites';
import { useUnreadCount } from '../../hooks/useNotifications';
import { FiCalendar, FiHeart, FiBell, FiArrowRight } from 'react-icons/fi';
import { Spinner } from '../../components/ui/Spinner';
import { Badge } from '../../components/ui/Badge';
import { formatDate, formatTime } from '../../lib/utils';
import { PropertyCard } from '../../components/ui/PropertyCard';

const ClientDashboard = () => {
  const { user, profile } = useAuth();
  
  const { data: bookings, isLoading: bookingsLoading } = useClientBookings(user?.id);
  const { data: favorites, isLoading: favoritesLoading } = useFavorites(user?.id);
  const { data: unreadCount } = useUnreadCount(user?.id);

  const recentBookings = bookings?.slice(0, 3) || [];
  const recentFavorites = favorites?.slice(0, 2) || [];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-navy-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-crimson-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0]}!
          </h2>
          <p className="text-cream-50/80">
            Manage your viewings, saved properties, and profile from your dashboard.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <FiCalendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
            <p className="text-2xl font-bold text-navy-900">{bookings?.length || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-cream-100 text-crimson-600 rounded-xl flex items-center justify-center">
            <FiHeart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Saved Properties</p>
            <p className="text-2xl font-bold text-navy-900">{favorites?.length || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-cream-100 text-crimson-600 rounded-xl flex items-center justify-center">
            <FiBell className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Unread Notifications</p>
            <p className="text-2xl font-bold text-navy-900">{unreadCount || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-display font-bold text-navy-900 text-lg">Recent Bookings</h3>
            <Link to="/client/bookings" className="text-sm font-medium text-crimson-600 hover:text-crimson-700 flex items-center gap-1">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="p-6 flex-1">
            {bookingsLoading ? (
              <div className="flex justify-center py-8"><Spinner /></div>
            ) : recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map(booking => (
                  <div key={booking.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      {booking.properties?.property_images?.[0]?.url ? (
                        <img src={booking.properties.property_images[0].url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/properties/${booking.property_id}`} className="font-bold text-navy-900 hover:text-crimson-600 truncate block">
                        {booking.properties?.name}
                      </Link>
                      <p className="text-sm text-gray-500 mb-2 truncate">{booking.properties?.location}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {formatDate(booking.booking_date)} • {formatTime(booking.booking_time)}
                        </span>
                        <Badge status={booking.status} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FiCalendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">You don't have any bookings yet.</p>
                <Link to="/properties" className="text-crimson-600 font-medium text-sm mt-2 inline-block">Browse Properties</Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Favorites */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-display font-bold text-navy-900 text-lg">Saved Properties</h3>
            <Link to="/client/favorites" className="text-sm font-medium text-crimson-600 hover:text-crimson-700 flex items-center gap-1">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="p-6 flex-1 bg-gray-50/50">
            {favoritesLoading ? (
              <div className="flex justify-center py-8"><Spinner /></div>
            ) : recentFavorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {recentFavorites.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FiHeart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No saved properties yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
