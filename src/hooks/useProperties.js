import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { propertyService } from '../services/propertyService'
import toast from 'react-hot-toast'

export const useProperties = (filters = {}, pagination = { page: 1, pageSize: 12 }) => {
  return useQuery({
    queryKey: ['properties', filters, pagination],
    queryFn: () => propertyService.getProperties(filters, pagination),
    keepPreviousData: true,
  })
}

export const useProperty = (id) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyService.getPropertyById(id),
    enabled: !!id,
  })
}

export const useFeaturedProperties = (limit = 6) => {
  return useQuery({
    queryKey: ['properties', 'featured', limit],
    queryFn: () => propertyService.getFeaturedProperties(limit),
  })
}

export const useLatestProperties = (limit = 8) => {
  return useQuery({
    queryKey: ['properties', 'latest', limit],
    queryFn: () => propertyService.getLatestProperties(limit),
  })
}

export const useRelatedProperties = (propertyId, type, limit = 3) => {
  return useQuery({
    queryKey: ['properties', 'related', propertyId, type, limit],
    queryFn: () => propertyService.getRelatedProperties(propertyId, type, limit),
    enabled: !!propertyId && !!type,
  })
}

export const useCreateProperty = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => propertyService.createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      toast.success('Property created successfully')
    },
    onError: (error) => toast.error(error.message || 'Failed to create property')
  })
}

export const useUpdateProperty = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => propertyService.updateProperty(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] })
      toast.success('Property updated successfully')
    },
    onError: (error) => toast.error(error.message || 'Failed to update property')
  })
}

export const useDeleteProperty = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => propertyService.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      toast.success('Property deleted successfully')
    },
    onError: (error) => toast.error(error.message || 'Failed to delete property')
  })
}

export const useToggleFeatured = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, is_featured }) => propertyService.toggleFeatured(id, is_featured),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] })
      toast.success(variables.is_featured ? 'Property featured' : 'Property removed from featured')
    },
    onError: (error) => toast.error(error.message || 'Failed to update featured status')
  })
}

export const useUpdatePropertyStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }) => propertyService.updateStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] })
      toast.success('Property status updated')
    },
    onError: (error) => toast.error(error.message || 'Failed to update status')
  })
}
