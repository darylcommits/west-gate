import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export const useFavorites = (clientId) => {
  return useQuery({
    queryKey: ['favorites', clientId],
    queryFn: async () => {
      if (!clientId) return []
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          property_id,
          properties (*, property_images(*))
        `)
        .eq('client_id', clientId)
        .eq('properties.property_images.is_primary', true)
        
      if (error) throw error
      // Flatten the response to just return the properties array
      return data.map(f => f.properties).filter(Boolean)
    },
    enabled: !!clientId,
  })
}

export const useToggleFavorite = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ clientId, propertyId, isFavorite }) => {
      if (!clientId) throw new Error("Must be logged in to save properties")
      
      if (isFavorite) {
        // Remove favorite
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('client_id', clientId)
          .eq('property_id', propertyId)
        if (error) throw error
        return { isFavorite: false }
      } else {
        // Add favorite
        const { error } = await supabase
          .from('favorites')
          .insert([{ client_id: clientId, property_id: propertyId }])
        if (error) throw error
        return { isFavorite: true }
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', variables.clientId] })
      toast.success(data.isFavorite ? 'Saved to favorites' : 'Removed from favorites')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update favorites')
    }
  })
}

export const useIsFavorite = (clientId, propertyId) => {
  const { data: favorites } = useFavorites(clientId)
  if (!clientId || !favorites) return false
  return favorites.some(p => p.id === propertyId)
}
