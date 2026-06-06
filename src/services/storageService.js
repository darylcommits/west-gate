import { supabase } from '../lib/supabase'

export const storageService = {
  async uploadFile(bucket, path, file) {
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return { path, publicUrl }
  },

  async deleteFile(bucket, path) {
    if (!path) return;
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])
      
    if (error) throw error
  },

  getPublicUrl(bucket, path) {
    if (!path) return null;
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return publicUrl
  }
}
