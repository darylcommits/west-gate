import { useAdminStats, useRecentActivity, useVisitorStats, useRecentPageViews } from '../../hooks/useAdmin';
import { FiHome, FiUsers, FiMessageSquare, FiStar, FiEye, FiTrendingUp, FiGlobe, FiMonitor, FiSmartphone, FiTablet } from 'react-icons/fi';
import { Spinner } from '../../components/ui/Spinner';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

// Detect device type from user agent
const getDevice = (ua = '') => {
  if (/mobile/i.test(ua)) return { label: 'Mobile', icon: <FiSmartphone className="w-4 h-4" /> };
  if (/tablet|ipad/i.test(ua)) return { label: 'Tablet', icon: <FiTablet className="w-4 h-4" /> };
  return { label: 'Desktop', icon: <FiMonitor className="w-4 h-4" /> };
};

// Detect browser from user agent
const getBrowser = (ua = '') => {
  if (/chrome/i.test(ua) && !/edge|opr/i.test(ua)) return 'Chrome';
  if (/firefox/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
  if (/edge/i.test(ua)) return 'Edge';
  if (/opr|opera/i.test(ua)) return 'Opera';
  return 'Unknown';
};

// Format path nicely
const formatPath = (path) => {
  if (path === '/') return '🏠 Home';
  if (path.startsWith('/properties/')) return '🏡 Property Detail';
  if (path === '/properties') return '📋 Properties List';
  if (path === '/about') return 'ℹ️ About';
  if (path === '/contact') return '📬 Contact';
  return path;
};

const AdminDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity();
  const { data: visitorStats, isLoading: visitorLoading } = useVisitorStats();
  const { data: recentPageViews, isLoading: pageViewsLoading } = useRecentPageViews(25);

  if (statsLoading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  const statCards = [
    { title: 'Total Properties', value: stats?.totalProperties || 0, icon: <FiHome />, color: 'bg-navy-900 text-white', link: '/admin/properties' },
    { title: 'Active Clients', value: stats?.totalClients || 0, icon: <FiUsers />, color: 'bg-crimson-500 text-white', link: '/admin/clients' },
    { title: 'New Inquiries', value: stats?.totalInquiries || 0, icon: <FiMessageSquare />, color: 'bg-crimson-700 text-white', link: '/admin/inquiries' },
    { title: 'Featured Listings', value: stats?.featuredProperties || 0, icon: <FiStar />, color: 'bg-navy-500 text-white', link: '/admin/properties?featured=true' },
    { title: 'Unique Visitors', value: visitorLoading ? '...' : (visitorStats?.totalUniqueVisitors || 0), icon: <FiGlobe />, color: 'bg-crimson-500/80 text-white', link: '#' },
    { title: 'Total Page Views', value: visitorLoading ? '...' : (visitorStats?.totalPageViews || 0), icon: <FiEye />, color: 'bg-navy-700 text-white', link: '#' },
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

      {/* Visitor Breakdown */}
      {!visitorLoading && visitorStats && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <FiTrendingUp className="text-crimson-500 w-5 h-5" />
            <h3 className="font-display font-bold text-navy-900 text-lg">Visitor Breakdown</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Today', value: visitorStats.todayVisitors },
              { label: 'This Week', value: visitorStats.weekVisitors },
              { label: 'This Month', value: visitorStats.monthVisitors },
              { label: 'All Time', value: visitorStats.totalUniqueVisitors },
            ].map((item) => (
              <div key={item.label} className="bg-cream-100 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-navy-900">{item.value}</p>
                <p className="text-sm text-gray-500 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Visitors */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center gap-2">
            <FiGlobe className="text-crimson-500 w-5 h-5" />
            <h3 className="font-display font-bold text-navy-900 text-lg">Recent Website Visitors</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[420px] custom-scrollbar">
            {pageViewsLoading ? (
              <div className="flex justify-center py-8"><Spinner /></div>
            ) : recentPageViews && recentPageViews.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Page</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Device</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Browser</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentPageViews.map((view) => {
                    const device = getDevice(view.user_agent);
                    const browser = getBrowser(view.user_agent);
                    return (
                      <tr key={view.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 font-medium text-navy-900">{formatPath(view.path)}</td>
                        <td className="px-6 py-3">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            {device.icon} {device.label}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-600">{browser}</td>
                        <td className="px-6 py-3 text-gray-400 whitespace-nowrap">
                          {formatDistanceToNow(new Date(view.created_at), { addSuffix: true })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FiGlobe className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p>No website visitors recorded yet.</p>
                <p className="text-xs mt-1 text-gray-400">Visitors will appear here once they browse your site.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Activity + Quick Actions */}
        <div className="flex flex-col gap-6">
          {/* Recent Activity Log */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-display font-bold text-navy-900 text-lg">Activity Log</h3>
            </div>
            <div className="p-5 flex-1 overflow-y-auto max-h-[220px] custom-scrollbar">
              {activityLoading ? (
                <div className="flex justify-center py-6"><Spinner /></div>
              ) : recentActivity && recentActivity.length > 0 ? (
                <div className="relative border-l-2 border-gray-100 ml-3 space-y-5">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="relative pl-5">
                      <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-crimson-500"></span>
                      <p className="text-xs text-gray-400 mb-0.5">
                        {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                      </p>
                      <p className="text-navy-900 font-medium text-sm">
                        {activity.profiles?.full_name || 'System'} <span className="font-normal text-gray-600">{activity.action}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">No recent activity.</div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-display font-bold text-navy-900 text-lg">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
              <Link to="/admin/properties/new" className="w-full flex items-center gap-3 p-3 text-left text-navy-800 hover:bg-cream-200 rounded-lg transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center shrink-0"><FiHome /></div>
                Add New Property
              </Link>
              <Link to="/admin/inquiries" className="w-full flex items-center gap-3 p-3 text-left text-navy-800 hover:bg-cream-200 rounded-lg transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-crimson-500 text-white flex items-center justify-center shrink-0"><FiMessageSquare /></div>
                Reply to Inquiries
              </Link>
              <Link to="/admin/cms" className="w-full flex items-center gap-3 p-3 text-left text-navy-800 hover:bg-cream-200 rounded-lg transition-colors font-medium text-sm">
                <div className="w-8 h-8 rounded-lg bg-crimson-700 text-white flex items-center justify-center shrink-0"><FiStar /></div>
                Update Homepage Content
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
