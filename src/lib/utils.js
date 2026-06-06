import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price) => {
  if (price === null || price === undefined || price === 0) return 'Contact for Price';
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatShortPrice = (price) => {
  if (price === null || price === undefined) return '';
  if (price >= 1000000) {
    return `₱${(price / 1000000).toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `₱${(price / 1000).toFixed(0)}K`;
  }
  return `₱${price}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    return dateString;
  }
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  try {
    // Check if it's a full date string or just HH:mm:ss
    if (timeString.includes('T')) {
      return format(parseISO(timeString), 'h:mm a');
    }
    
    // Parse HH:mm:ss format
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return format(date, 'h:mm a');
  } catch (error) {
    return timeString;
  }
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getPropertyTypeLabel = (type) => {
  const types = {
    house_and_lot: 'House and Lot',
    lot_only: 'Lot Only',
    condominium: 'Condominium',
    commercial: 'Commercial',
    warehouse: 'Warehouse',
    farm_lot: 'Farm Lot',
    townhouse: 'Townhouse',
  };
  return types[type] || type;
};

export const getStatusColor = (status) => {
  const colors = {
    available: 'badge-available',
    sold: 'badge-sold',
    reserved: 'badge-reserved',
    off_market: 'bg-gray-100 text-gray-700',
    pending: 'badge-pending',
    approved: 'badge-approved',
    rejected: 'badge-rejected',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-gray-100 text-gray-700',
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-gray-100 text-gray-700',
    replied: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

export const getStatusLabel = (status) => {
  if (!status) return '';
  // Convert snake_case to Title Case
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const generatePropertyCode = () => {
  const year = new Date().getFullYear();
  const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `WG-${year}-${randomStr}${randomNum}`;
};

export const formatArea = (sqm) => {
  if (!sqm) return '';
  return `${sqm} sqm`;
};
