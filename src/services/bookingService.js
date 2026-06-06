import { supabase } from '../lib/supabase'

export const bookingService = {
  async createBooking(bookingData) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async getBookingsByClient(clientId) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        properties (id, name, location, city, property_images (url))
      `)
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
      
    if (error) throw error
    return data
  },

  async getAllBookings(filters = {}) {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        properties (id, name, property_code),
        profiles (id, full_name, email, phone)
      `)
      .order('created_at', { ascending: false })

    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async updateBookingStatus(id, status, adminNotes = null) {
    const updates = { status }
    if (adminNotes !== null) updates.admin_notes = adminNotes

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async rescheduleBooking(id, newDate, newTime, adminNotes = null) {
    const updates = { 
      reschedule_date: newDate, 
      reschedule_time: newTime,
      status: 'pending' // Usually resets to pending on reschedule
    }
    if (adminNotes !== null) updates.admin_notes = adminNotes

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async cancelBooking(id) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async checkConflict(propertyId, date, time, excludeId = null) {
    let query = supabase
      .from('bookings')
      .select('id')
      .eq('property_id', propertyId)
      .eq('booking_date', date)
      .eq('booking_time', time)
      .in('status', ['pending', 'approved'])

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { data, error } = await query
    if (error) throw error
    return data.length > 0
  },

  async getBookingStats() {
    const { data, error } = await supabase
      .from('bookings')
      .select('status')
      
    if (error) throw error
    
    const stats = {
      pending: 0,
      approved: 0,
      rejected: 0,
      completed: 0,
      cancelled: 0,
      total: data.length
    }
    
    data.forEach(b => {
      if (stats[b.status] !== undefined) {
        stats[b.status]++
      }
    })
    
    return stats
  }
}
