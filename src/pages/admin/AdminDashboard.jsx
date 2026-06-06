import { useAdminStats, useRecentActivity } from '../../hooks/useAdmin';
import { FiHome, FiUsers, FiCalendar, FiMessageSquare, FiStar, FiEye } from 'react-icons/fi';
import { Spinner } from '../../components/ui/Spinner';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const AdminDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity();

  if (statsLoading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  const statCards = [
    { title: 'Total Properties', value: stats?.totalProperties || 0, icon: <FiHome />, color: 'bg-navy-900 text-white', link: '/admin/properties' },
    { title: 'Active Clients', value: stats?.totalClients || 0, icon: <FiUsers />, color: 'bg-crimson-500 text-white', link: '/admin/clients' },
    { title: 'Pending Viewings', value: stats?.activeBookings || 0, icon: <FiCalendar />, color: 'bg-navy-700 text-white', link: '/admin/bookings' },
    { title: 'New Inquiries', value: stats?.totalInquiries || 0, icon: <FiMessageSquare />, color: 'bg-crimson-700 text-white', link: '/admin/inquiries' },
    { title: 'Featured Listings', value: stats?.featuredProperties || 0, icon: <FiStar />, color: 'bg-navy-500 text-white', link: '/admin/properties?featured=true' },
    { title: 'Total Views', value: stats?.totalViews || 0, icon: <FiEye />, color: 'bg-crimson-500/80 text-white', link: '#' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Dashboard Overview</h1>
          <p className="text-gray-600">Here's what's happening with your properties today.</p>
        </div>
        <Link to="/admin/properties/new" className="btn-primary text-sm px-4 py-2 hidden sm:inline-flex items-center gap-2">
          + Add New Property
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Link key={index} to={stat.link} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-navy-900">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-display font-bold text-navy-900 text-lg">Recent Activity Log</h3>
          </div>
          <div className="p-6 flex-1 overflow-y-auto max-h-[400px] custom-scrollbar">
            {activityLoading ? (
              <div className="flex justify-center py-8"><Spinner /></div>
            ) : recentActivity && recentActivity.length > 0 ? (
              <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="relative pl-6">
                    <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-crimson-500"></span>
                    <p className="text-sm text-gray-500 mb-1">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </p>
                    <p className="text-navy-900 font-medium">
                      {activity.profiles?.full_name || 'System'} <span className="font-normal text-gray-600">{activity.action}</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No recent activity to show.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-display font-bold text-navy-900 text-lg">Quick Actions</h3>
          </div>
          <div className="p-4 space-y-2">
            <Link to="/admin/properties/new" className="w-full flex items-center gap-3 p-3 text-left text-navy-800 hover:bg-cream-200 rounded-lg transition-colors font-medium">
              <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center shrink-0"><FiHome /></div>
              Add New Property
            </Link>
            <Link to="/admin/bookings" className="w-full flex items-center gap-3 p-3 text-left text-navy-800 hover:bg-cream-200 rounded-lg transition-colors font-medium">
              <div className="w-8 h-8 rounded-lg bg-navy-700 text-white flex items-center justify-center shrink-0"><FiCalendar /></div>
              Review Pending Bookings
            </Link>
            <Link to="/admin/inquiries" className="w-full flex items-center gap-3 p-3 text-left text-navy-800 hover:bg-cream-200 rounded-lg transition-colors font-medium">
              <div className="w-8 h-8 rounded-lg bg-crimson-500 text-white flex items-center justify-center shrink-0"><FiMessageSquare /></div>
              Reply to Inquiries
            </Link>
            <Link to="/admin/cms" className="w-full flex items-center gap-3 p-3 text-left text-navy-800 hover:bg-cream-200 rounded-lg transition-colors font-medium">
              <div className="w-8 h-8 rounded-lg bg-crimson-700 text-white flex items-center justify-center shrink-0"><FiStar /></div>
              Update Homepage Content
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
