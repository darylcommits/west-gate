import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '../services/notificationService'

export const useNotifications = (userId) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => notificationService.getNotifications(userId),
    enabled: !!userId,
  })

  useEffect(() => {
    if (!userId) return

    const subscription = notificationService.subscribeToNotifications(userId, (newNotification) => {
      // Invalidate both lists and counts
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] })
      queryClient.invalidateQueries({ queryKey: ['notifications', 'count', userId] })
    })

    return () => {
      subscription.then(sub => sub.unsubscribe())
    }
  }, [userId, queryClient])

  return query
}

export const useUnreadCount = (userId) => {
  return useQuery({
    queryKey: ['notifications', 'count', userId],
    queryFn: () => notificationService.getUnreadCount(userId),
    enabled: !!userId,
    refetchInterval: 1000 * 60, // Refetch every minute as backup
  })
}

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => notificationService.markAsRead(id),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  })
}

export const useMarkAllRead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId) => notificationService.markAllAsRead(userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notifications', variables] })
      queryClient.invalidateQueries({ queryKey: ['notifications', 'count', variables] })
    }
  })
}
