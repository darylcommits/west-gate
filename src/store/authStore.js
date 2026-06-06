import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      session: null,
      isLoading: true, // Start true until initialized
      isAuthenticated: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfile: (profile) => set({ profile }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      
      logout: () => set({ 
        user: null, 
        profile: null, 
        session: null, 
        isAuthenticated: false 
      }),
      
      isAdmin: () => get().profile?.role === 'admin',
      isClient: () => get().profile?.role === 'client',
    }),
    { 
      name: 'westgate-auth', 
      partialize: (state) => ({ user: state.user, profile: state.profile }) 
    }
  )
)
