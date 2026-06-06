import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cmsService } from '../services/cmsService'
import toast from 'react-hot-toast'

export const useCMSContent = (section) => {
  return useQuery({
    queryKey: ['cms', section],
    queryFn: () => cmsService.getCMSContent(section),
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

export const useAllCMSContent = () => {
  return useQuery({
    queryKey: ['cms', 'all'],
    queryFn: () => cmsService.getAllCMSContent(),
    staleTime: 1000 * 60 * 60,
  })
}

export const useUpdateCMSContent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ section, updates }) => cmsService.updateCMSContent(section, updates),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cms', variables.section] })
      queryClient.invalidateQueries({ queryKey: ['cms', 'all'] })
      toast.success('Content updated successfully')
    },
    onError: (error) => toast.error(error.message || 'Failed to update content')
  })
}

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => cmsService.getTestimonials(),
  })
}

export const useAdminTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials', 'admin'],
    queryFn: () => cmsService.getAdminTestimonials(),
  })
}

export const useUpsertTestimonial = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (testimonial) => cmsService.upsertTestimonial(testimonial),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
      toast.success('Testimonial saved')
    },
    onError: (error) => toast.error(error.message || 'Failed to save testimonial')
  })
}

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => cmsService.deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
      toast.success('Testimonial deleted')
    },
    onError: (error) => toast.error(error.message || 'Failed to delete testimonial')
  })
}
