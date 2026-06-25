import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '../services/transactionService'
import toast from 'react-hot-toast'

export const usePublishedTransactions = (limit = 10) => {
  return useQuery({
    queryKey: ['transactions', 'published', limit],
    queryFn: () => transactionService.getPublishedTransactions(limit),
  })
}

export const useAllTransactions = () => {
  return useQuery({
    queryKey: ['transactions', 'all'],
    queryFn: () => transactionService.getAllTransactions(),
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => transactionService.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Transaction added successfully')
    },
    onError: (error) => toast.error(error.message || 'Failed to add transaction'),
  })
}

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => transactionService.updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Transaction updated')
    },
    onError: (error) => toast.error(error.message || 'Failed to update transaction'),
  })
}

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => transactionService.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Transaction deleted')
    },
    onError: (error) => toast.error(error.message || 'Failed to delete transaction'),
  })
}
