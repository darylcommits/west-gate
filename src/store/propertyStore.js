import { create } from 'zustand'

const initialFilters = {
  search: '',
  property_type: [],
  status: 'available',
  province: '',
  city: '',
  min_price: '',
  max_price: '',
  is_featured: false,
  sort: 'newest' // newest, oldest, highest_price, lowest_price
}

export const usePropertyStore = create((set, get) => ({
  filters: { ...initialFilters },
  
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  
  resetFilters: () => set({ filters: { ...initialFilters } }),
  
  setSort: (sort) => set((state) => ({
    filters: { ...state.filters, sort }
  })),
  
  pagination: {
    page: 1,
    pageSize: 12,
    total: 0
  },
  
  setPagination: (updates) => set((state) => ({
    pagination: { ...state.pagination, ...updates }
  })),
  
  resetPagination: () => set((state) => ({
    pagination: { ...state.pagination, page: 1 }
  }))
}))
