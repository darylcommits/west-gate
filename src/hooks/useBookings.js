import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingService } from '../services/bookingService'
import toast from 'react-hot-toast'

export const useBookings = (filters = {}) => {
  return useQuery({
    queryKey: ['bookings', 'admin', filters],
    queryFn: () => bookingService.getAllBookings(filters),
  })
}

export const useClientBookings = (clientId) => {
  return useQuery({
    queryKey: ['bookings', 'client', clientId],
    queryFn: () => bookingService.getBookingsByClient(clientId),
    enabled: !!clientId,
  })
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => bookingService.createBooking(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      toast.success('Viewing scheduled successfully! We will contact you shortly.')
    },
    onError: (error) => toast.error(error.message || 'Failed to schedule viewing')
  })
}

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status, adminNotes }) => bookingService.updateBookingStatus(id, status, adminNotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      toast.success('Booking status updated')
    },
    onError: (error) => toast.error(error.message || 'Failed to update booking status')
  })
}

export const useRescheduleBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, newDate, newTime, adminNotes }) => bookingService.rescheduleBooking(id, newDate, newTime, adminNotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      toast.success('Booking rescheduled successfully')
    },
    onError: (error) => toast.error(error.message || 'Failed to reschedule booking')
  })
}

export const useCancelBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => bookingService.cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      toast.success('Booking cancelled')
    },
    onError: (error) => toast.error(error.message || 'Failed to cancel booking')
  })
}
