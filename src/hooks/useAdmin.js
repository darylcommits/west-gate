import { useQuery } from '@tanstack/react-query'
import { adminService } from '../services/adminService'

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminService.getDashboardStats(),
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 mins
  })
}

export const useMonthlyBookings = () => {
  return useQuery({
    queryKey: ['admin', 'monthlyBookings'],
    queryFn: () => adminService.getMonthlyBookings(),
  })
}

export const usePropertyTypeStats = () => {
  return useQuery({
    queryKey: ['admin', 'propertyTypeStats'],
    queryFn: () => adminService.getPropertyTypeStats(),
  })
}

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['admin', 'recentActivity'],
    queryFn: () => adminService.getRecentActivity(),
  })
}

export const useVisitorStats = () => {
  return useQuery({
    queryKey: ['admin', 'visitorStats'],
    queryFn: () => adminService.getVisitorStats(),
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 mins
  })
}

export const useRecentPageViews = (limit = 20) => {
  return useQuery({
    queryKey: ['admin', 'recentPageViews', limit],
    queryFn: () => adminService.getRecentPageViews(limit),
    refetchInterval: 1000 * 60 * 2,
  })
}
