import { supabase } from '../lib/supabase'

export const adminService = {
  async getDashboardStats() {
    const [
      { count: totalProperties },
      { count: totalClients },
      { count: activeBookings },
      { count: featuredProperties },
      { count: totalInquiries },
      { data: propertiesData }
    ] = await Promise.all([
      supabase.from('properties').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
      supabase.from('bookings').select('*', { count: 'exact', head: true }).in('status', ['pending', 'approved']),
      supabase.from('properties').select('*', { count: 'exact', head: true }).eq('is_featured', true),
      supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('properties').select('views_count')
    ])

    const totalViews = propertiesData?.reduce((sum, p) => sum + (p.views_count || 0), 0) || 0

    return {
      totalProperties: totalProperties || 0,
      totalClients: totalClients || 0,
      activeBookings: activeBookings || 0,
      featuredProperties: featuredProperties || 0,
      totalInquiries: totalInquiries || 0,
      totalViews
    }
  },

  async getMonthlyBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('created_at')
      .gte('created_at', new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString())

    if (error) throw error

    // Process data to group by month
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const bookingsByMonth = {}
    
    // Initialize last 6 months with 0
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      bookingsByMonth[`${months[d.getMonth()]} ${d.getFullYear()}`] = 0
    }

    data.forEach(b => {
      const d = new Date(b.created_at)
      const key = `${months[d.getMonth()]} ${d.getFullYear()}`
      if (bookingsByMonth[key] !== undefined) {
        bookingsByMonth[key]++
      }
    })

    return Object.entries(bookingsByMonth).map(([name, bookings]) => ({ name, bookings }))
  },

  async getPropertyTypeStats() {
    const { data, error } = await supabase
      .from('properties')
      .select('property_type')

    if (error) throw error

    const stats = {}
    data.forEach(p => {
      stats[p.property_type] = (stats[p.property_type] || 0) + 1
    })

    return Object.entries(stats).map(([name, value]) => ({ 
      name: name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), 
      value 
    }))
  },

  async getRecentActivity() {
    const { data, error } = await supabase
      .from('activity_logs')
      .select(`
        *,
        profiles (full_name)
      `)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) throw error
    return data
  },

  async getVisitorStats() {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    const [{ data: totalData }, { data: todayData }, { data: weekData }, { data: monthData }] = await Promise.all([
      supabase.from('page_views').select('session_id'),
      supabase.from('page_views').select('session_id').gte('created_at', todayStart),
      supabase.from('page_views').select('session_id').gte('created_at', weekStart),
      supabase.from('page_views').select('session_id').gte('created_at', monthStart),
    ])

    const uniqueSessions = (rows) => new Set(rows?.map(r => r.session_id) || []).size

    return {
      totalPageViews: totalData?.length || 0,
      totalUniqueVisitors: uniqueSessions(totalData),
      todayVisitors: uniqueSessions(todayData),
      weekVisitors: uniqueSessions(weekData),
      monthVisitors: uniqueSessions(monthData),
    }
  },

  async getRecentPageViews(limit = 20) {
    const { data, error } = await supabase
      .from('page_views')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }
}
