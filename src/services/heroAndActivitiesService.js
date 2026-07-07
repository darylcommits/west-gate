import { supabase } from '../lib/supabase';

export const heroSlidesService = {
  async getSlides() {
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getAllSlides() {
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async upsertSlide(slide) {
    const { data, error } = await supabase
      .from('hero_slides')
      .upsert(slide)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteSlide(id) {
    const { error } = await supabase.from('hero_slides').delete().eq('id', id);
    if (error) throw error;
  },

  async uploadMedia(file) {
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('hero-slides').upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('hero-slides').getPublicUrl(path);
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
    return { url: data.publicUrl, path, mediaType };
  },

  async deleteImage(path) {
    await supabase.storage.from('hero-slides').remove([path]);
  },
};

export const dailyActivitiesService = {
  async getActivities(limit = 20) {
    const { data, error } = await supabase
      .from('daily_activities')
      .select('*')
      .eq('is_published', true)
      .order('activity_date', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  },

  async getAllActivities() {
    const { data, error } = await supabase
      .from('daily_activities')
      .select('*')
      .order('activity_date', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async upsertActivity(activity) {
    const { data, error } = await supabase
      .from('daily_activities')
      .upsert(activity)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteActivity(id) {
    const { error } = await supabase.from('daily_activities').delete().eq('id', id);
    if (error) throw error;
  },

  async uploadMedia(file) {
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('daily-activities').upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('daily-activities').getPublicUrl(path);
    return { url: data.publicUrl, path };
  },
};
