import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { inquiryService } from '../services/inquiryService'
import toast from 'react-hot-toast'

export const useInquiries = (filters = {}) => {
  return useQuery({
    queryKey: ['inquiries', 'admin', filters],
    queryFn: () => inquiryService.getInquiries(filters),
  })
}

export const useSubmitInquiry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => inquiryService.submitInquiry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
      toast.success('Your message has been sent successfully!')
    },
    onError: (error) => toast.error(error.message || 'Failed to send message')
  })
}

export const useUpdateInquiry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status, reply }) => inquiryService.updateInquiryStatus(id, status, reply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
      toast.success('Inquiry updated')
    },
    onError: (error) => toast.error(error.message || 'Failed to update inquiry')
  })
}
