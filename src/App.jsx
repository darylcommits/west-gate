import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Suspense, lazy } from 'react'
import { useAuthStore } from './store/authStore'

// Layouts
import PublicLayout from './components/layout/PublicLayout'
import AdminLayout from './components/layout/AdminLayout'
import { useTracking } from './hooks/useTracking'
import { Spinner } from './components/ui/Spinner'

// Lazy loaded pages - Public
const HomePage = lazy(() => import('./pages/public/HomePage'))
const PropertiesPage = lazy(() => import('./pages/public/PropertiesPage'))
const PropertyDetailPage = lazy(() => import('./pages/public/PropertyDetailPage'))
const AboutPage = lazy(() => import('./pages/public/AboutPage'))
const ContactPage = lazy(() => import('./pages/public/ContactPage'))

// Lazy loaded pages - Admin Auth
const AdminLoginPage = lazy(() => import('./pages/auth/AdminLoginPage'))

// Lazy loaded pages - Admin
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProperties = lazy(() => import('./pages/admin/AdminProperties'))
const AdminPropertyForm = lazy(() => import('./pages/admin/AdminPropertyForm'))
const AdminClients = lazy(() => import('./pages/admin/AdminClients'))
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries'))
const AdminCMS = lazy(() => import('./pages/admin/AdminCMS'))
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'))

// Admin-only route guard
const AdminRoute = ({ children }) => {
  const { isAuthenticated, profile } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  if (profile && profile.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

// Redirect admins away from login if already authenticated
const AdminLoginRoute = ({ children }) => {
  const { isAuthenticated, profile } = useAuthStore()

  if (isAuthenticated && profile?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner size="lg" />
  </div>
)

const TrackingWrapper = ({ children }) => {
  useTracking();
  return children;
};

import { ImageGallery } from './components/ui/ImageGallery'
import { VideoModal } from './components/ui/VideoModal'
import { AIChatWidget } from './components/ui/AIChatWidget'

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ className: 'custom-toast' }} />
      <ImageGallery />
      <VideoModal />
      <AIChatWidget />
      
      <Suspense fallback={<LoadingFallback />}>
        <TrackingWrapper>
          <Routes>
          {/* Public Routes with Navbar/Footer — open to everyone */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin Login — standalone, no public navbar */}
          <Route
            path="/admin/login"
            element={
              <AdminLoginRoute>
                <AdminLoginPage />
              </AdminLoginRoute>
            }
          />

          {/* Admin Routes — protected, admin only */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="properties/new" element={<AdminPropertyForm />} />
            <Route path="properties/:id/edit" element={<AdminPropertyForm />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="cms" element={<AdminCMS />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </TrackingWrapper>
      </Suspense>
    </Router>
  )
}

export default App
