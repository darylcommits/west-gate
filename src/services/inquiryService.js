import { supabase } from '../lib/supabase'

export const inquiryService = {
  async submitInquiry(inquiryData) {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiryData])
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async getInquiries(filters = {}) {
    let query = supabase
      .from('inquiries')
      .select(`
        *,
        properties (id, name, property_code)
      `)
      .order('created_at', { ascending: false })

    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async updateInquiryStatus(id, status, reply = null) {
    const updates = { status }
    if (reply !== null) updates.admin_reply = reply

    const { data, error } = await supabase
      .from('inquiries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async getInquiryStats() {
    const { data, error } = await supabase
      .from('inquiries')
      .select('status')
      
    if (error) throw error
    
    const stats = {
      new: 0,
      read: 0,
      replied: 0,
      closed: 0,
      total: data.length
    }
    
    data.forEach(i => {
      if (stats[i.status] !== undefined) {
        stats[i.status]++
      }
    })
    
    return stats
  }
}
