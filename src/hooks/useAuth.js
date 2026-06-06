import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { user, profile, session, isLoading, isAuthenticated, isAdmin, isClient, setUser, setProfile, setSession, setLoading, logout } = useAuthStore()

  useEffect(() => {
    // Initial session check
    authService.getSession().then((session) => {
      setSession(session)
      setUser(session?.user || null)
      if (!session?.user) {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user || null)
      
      if (event === 'SIGNED_OUT') {
        logout()
        queryClient.clear()
        setLoading(false)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [setUser, setSession, logout, queryClient, setLoading])

  // Fetch profile when user changes
  useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null
      const data = await authService.getProfile(user.id)
      setProfile(data)
      setLoading(false)
      return data
    },
    enabled: !!user?.id,
    staleTime: Infinity,
  })

  const signInMutation = useMutation({
    mutationFn: ({ email, password }) => authService.signIn(email, password),
    onSuccess: (data) => {
      toast.success('Successfully logged in!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to sign in')
    }
  })

  const signUpMutation = useMutation({
    mutationFn: ({ email, password, fullName, phone }) => authService.signUp(email, password, fullName, phone),
    onSuccess: () => {
      toast.success('Registration successful! Please check your email to verify your account.')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to register')
    }
  })

  const signOutMutation = useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      toast.success('Logged out successfully')
    }
  })

  return {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated,
    isAdmin: isAdmin(),
    isClient: isClient(),
    signIn: signInMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
    signOut: signOutMutation.mutateAsync,
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isSigningOut: signOutMutation.isPending,
  }
}
