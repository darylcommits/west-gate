import { create } from 'zustand'

export const useUiStore = create((set) => ({
  // Booking Modal State
  bookingModal: {
    isOpen: false,
    propertyId: null,
    property: null,
  },
  openBookingModal: (propertyId, property = null) => set({ 
    bookingModal: { isOpen: true, propertyId, property } 
  }),
  closeBookingModal: () => set({ 
    bookingModal: { isOpen: false, propertyId: null, property: null } 
  }),

  // Image Gallery State
  imageGallery: {
    isOpen: false,
    images: [],
    currentIndex: 0,
  },
  openImageGallery: (images, currentIndex = 0) => set({ 
    imageGallery: { isOpen: true, images, currentIndex } 
  }),
  closeImageGallery: () => set({ 
    imageGallery: { isOpen: false, images: [], currentIndex: 0 } 
  }),

  // Video Modal State
  videoModal: {
    isOpen: false,
    videoUrl: null,
  },
  openVideoModal: (videoUrl) => set({ 
    videoModal: { isOpen: true, videoUrl } 
  }),
  closeVideoModal: () => set({ 
    videoModal: { isOpen: false, videoUrl: null } 
  }),

  // Sidebar State
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Mobile Menu State
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}))
