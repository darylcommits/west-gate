import { supabase } from '../lib/supabase'

export const cmsService = {
  async getCMSContent(section) {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .eq('section', section)
      .single()
      
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async getAllCMSContent() {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .eq('is_published', true)
      
    if (error) throw error
    return data
  },

  async updateCMSContent(section, updates) {
    const { data, error } = await supabase
      .from('cms_content')
      .upsert({ section, ...updates, updated_at: new Date().toISOString() }, { onConflict: 'section' })
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async getTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      
    if (error) throw error
    return data
  },

  async getAdminTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
      
    if (error) throw error
    return data
  },

  async upsertTestimonial(testimonial) {
    const { data, error } = await supabase
      .from('testimonials')
      .upsert(testimonial)
      .select()
      .single()
      
    if (error) throw error
    return data
  },

  async deleteTestimonial(id) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
      
    if (error) throw error
  }
}
