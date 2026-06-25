import { supabase } from '../lib/supabase'

export const transactionService = {
  async getPublishedTransactions(limit = 10) {
    const { data, error } = await supabase
      .from('proof_of_transactions')
      .select('*')
      .eq('is_published', true)
      .order('transaction_date', { ascending: false })
      .limit(limit)
    if (error) throw error
    return data
  },

  async getAllTransactions() {
    const { data, error } = await supabase
      .from('proof_of_transactions')
      .select('*')
      .order('transaction_date', { ascending: false })
    if (error) throw error
    return data
  },

  async createTransaction(transaction) {
    const { data, error } = await supabase
      .from('proof_of_transactions')
      .insert(transaction)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateTransaction(id, updates) {
    const { data, error } = await supabase
      .from('proof_of_transactions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteTransaction(id) {
    const { error } = await supabase
      .from('proof_of_transactions')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  async uploadMedia(file, folder = 'proofs') {
    const ext = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage
      .from('transaction-proofs')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })
    if (error) throw error
    const { data: urlData } = supabase.storage
      .from('transaction-proofs')
      .getPublicUrl(fileName)
    return { url: urlData.publicUrl, path: fileName }
  },

  async deleteMedia(storagePath) {
    if (!storagePath) return
    const { error } = await supabase.storage
      .from('transaction-proofs')
      .remove([storagePath])
    if (error) console.warn('Failed to delete media:', error)
  }
}
