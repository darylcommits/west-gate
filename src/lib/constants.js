export const PROPERTY_TYPES = [
  { value: 'house_and_lot', label: 'House and Lot' },
  { value: 'lot_only', label: 'Lot Only' },
  { value: 'condominium', label: 'Condominium' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'farm_lot', label: 'Farm Lot' },
  { value: 'townhouse', label: 'Townhouse' },
];

export const PROVINCES = [
  'Ilocos Norte',
  'Ilocos Sur',
  'La Union',
  'Pangasinan'
];

export const CITIES_BY_PROVINCE = {
  'Ilocos Norte': [
    'Laoag City', 'Batac City', 'Bacarra', 'Badoc', 'Bangui', 
    'Banna', 'Burgos', 'Carasi', 'Currimao', 'Dingras', 
    'Dumalneg', 'Marcos', 'Nueva Era', 'Pagudpud', 'Paoay', 
    'Pasuquin', 'Piddig', 'Pinili', 'San Nicolas', 'Sarrat', 
    'Solsona', 'Vintar'
  ],
  'Ilocos Sur': [
    'Vigan City', 'Candon City', 'Bantay', 'Cabugao', 'Caoayan', 
    'Magsingal', 'Narvacan', 'San Ildefonso', 'San Juan', 'San Vicente', 
    'Santa', 'Santa Catalina', 'Santa Cruz', 'Santa Lucia', 'Santa Maria', 
    'Santiago', 'Santo Domingo', 'Sinait', 'Tagudin'
  ],
  'La Union': [
    'San Fernando City', 'Agoo', 'Aringay', 'Bacnotan', 'Bagulin', 
    'Balaoan', 'Bangar', 'Bauang', 'Burgos', 'Caba', 
    'Luna', 'Naguilian', 'Pugo', 'Rosario', 'San Gabriel', 
    'San Juan', 'Santo Tomas', 'Santol', 'Sudipen', 'Tubao'
  ],
  'Pangasinan': [
    'Alaminos City', 'Dagupan City', 'San Carlos City', 'Urdaneta City', 'Agno', 
    'Aguilar', 'Alcala', 'Anda', 'Asingan', 'Balungao', 
    'Bani', 'Basista', 'Bautista', 'Bayambang', 'Binalonan', 
    'Binmaley', 'Bolinao', 'Bugallon', 'Burgos', 'Calasiao'
  ]
};

export const BOOKING_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'badge-pending' },
  { value: 'approved', label: 'Approved', color: 'badge-approved' },
  { value: 'rejected', label: 'Rejected', color: 'badge-rejected' },
  { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-700' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-gray-100 text-gray-700' },
];

export const PROPERTY_STATUSES = [
  { value: 'available', label: 'Available', color: 'badge-available' },
  { value: 'sold', label: 'Sold', color: 'badge-sold' },
  { value: 'reserved', label: 'Reserved', color: 'badge-reserved' },
  { value: 'off_market', label: 'Off Market', color: 'bg-gray-100 text-gray-700' },
];

export const INQUIRY_STATUSES = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'read', label: 'Read', color: 'bg-gray-100 text-gray-700' },
  { value: 'replied', label: 'Replied', color: 'bg-green-100 text-green-700' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-700' },
];

export const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Properties', path: '/properties' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'FiGrid' },
  { name: 'Properties', path: '/admin/properties', icon: 'FiHome' },
  { name: 'Clients', path: '/admin/clients', icon: 'FiUsers' },
  { name: 'Inquiries', path: '/admin/inquiries', icon: 'FiMessageSquare' },
  { name: 'CMS', path: '/admin/cms', icon: 'FiLayout' },
  { name: 'Testimonials', path: '/admin/testimonials', icon: 'FiStar' },
  { name: 'Settings', path: '/admin/settings', icon: 'FiSettings' },
];

export const CLIENT_NAV_LINKS = [
  { name: 'Dashboard', path: '/client/dashboard', icon: 'FiGrid' },
  { name: 'My Bookings', path: '/client/bookings', icon: 'FiCalendar' },
  { name: 'Saved Properties', path: '/client/favorites', icon: 'FiHeart' },
  { name: 'My Profile', path: '/client/profile', icon: 'FiUser' },
  { name: 'Notifications', path: '/client/notifications', icon: 'FiBell' },
];

export const PRICE_RANGES = [
  { label: 'Any Price', min: '', max: '' },
  { label: 'Under ₱1 Million', min: '', max: 1000000 },
  { label: '₱1M - ₱3M', min: 1000000, max: 3000000 },
  { label: '₱3M - ₱5M', min: 3000000, max: 5000000 },
  { label: '₱5M - ₱10M', min: 5000000, max: 10000000 },
  { label: '₱10M - ₱20M', min: 10000000, max: 20000000 },
  { label: 'Over ₱20 Million', min: 20000000, max: '' },
];

export const generatePropertyCode = () => {
  const prefix = 'WGR';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};
