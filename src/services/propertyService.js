import { supabase } from '../lib/supabase'

export const propertyService = {
  async getProperties({ search, property_type, status, province, city, min_price, max_price, is_featured, sort } = {}, { page = 1, pageSize = 12 } = {}) {
    let query = supabase.from('properties').select('*, property_images(*)', { count: 'exact' })

    // Only get primary images to save bandwidth
    query.eq('property_images.is_primary', true)

    if (search) {
      query.or(`name.ilike.%${search}%,description.ilike.%${search}%,city.ilike.%${search}%,barangay.ilike.%${search}%,property_code.ilike.%${search}%`)
    }
    
    if (property_type && property_type.length > 0) {
      query.in('property_type', property_type)
    }
    
    if (status) query.eq('status', status)
    if (province) query.eq('province', province)
    if (city) query.eq('city', city)
    if (min_price) query.gte('price', min_price)
    if (max_price) query.lte('price', max_price)
    if (is_featured) query.eq('is_featured', true)

    // Sorting
    switch (sort) {
      case 'newest':
        query.order('created_at', { ascending: false })
        break
      case 'oldest':
        query.order('created_at', { ascending: true })
        break
      case 'highest_price':
        query.order('price', { ascending: false })
        break
      case 'lowest_price':
        query.order('price', { ascending: true })
        break
      default:
        query.order('created_at', { ascending: false })
    }

    // Pagination
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query.range(from, to)

    const { data, error, count } = await query
    if (error) throw error
    return { data, count }
  },

  async getPropertyById(id) {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_images (*),
        property_videos (*),
        property_documents (*)
      `)
      .eq('id', id)
      .single()
      
    if (error) throw error
    return data
  },

  async getFeaturedProperties(limit = 6) {
    const { data, error } = await supabase
      .from('properties')
      .select('*, property_images(*)')
      .eq('is_featured', true)
      .eq('status', 'available')
      .eq('property_images.is_primary', true)
      .order('created_at', { ascending: false })
      .limit(limit)
      
    if (error) throw error
    return data
  },

  async getLatestProperties(limit = 8) {
    const { data, error } = await supabase
      .from('properties')
      .select('*, property_images(*)')
      .eq('status', 'available')
      .eq('property_images.is_primary', true)
      .order('created_at', { ascending: false })
      .limit(limit)
      
    if (error) throw error
    return data
  },

  async createProperty(propertyData) {
    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async updateProperty(id, propertyData) {
    const { data, error } = await supabase
      .from('properties')
      .update(propertyData)
      .eq('id', id)
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async deleteProperty(id) {
    const { error } = await supabase.from('properties').delete().eq('id', id)
    if (error) throw error
  },

  async toggleFeatured(id, is_featured) {
    const { data, error } = await supabase
      .from('properties')
      .update({ is_featured })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('properties')
      .update({ status })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async incrementViews(id) {
    const { error } = await supabase.rpc('increment_property_views', { property_uuid: id })
    if (error) console.error('Failed to increment views:', error)
  },

  async getRelatedProperties(propertyId, type, limit = 3) {
    const { data, error } = await supabase
      .from('properties')
      .select('*, property_images(*)')
      .eq('property_type', type)
      .eq('status', 'available')
      .neq('id', propertyId)
      .eq('property_images.is_primary', true)
      .limit(limit)
      
    if (error) throw error
    return data
  }
}
