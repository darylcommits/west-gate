import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useClientBookings, useCancelBooking } from '../../hooks/useBookings';
import { FiCalendar, FiClock, FiMapPin, FiX } from 'react-icons/fi';
import { Spinner } from '../../components/ui/Spinner';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatDate, formatTime } from '../../lib/utils';
import toast from 'react-hot-toast';

const ClientBookings = () => {
  const { user } = useAuth();
  const { data: bookings, isLoading } = useClientBookings(user?.id);
  const cancelBooking = useCancelBooking();

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking.mutateAsync(id);
      } catch (error) {
        // Error handled by hook
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy-900">My Bookings</h1>
        <p className="text-gray-600">Manage your property viewings and schedules.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : bookings && bookings.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {bookings.map(booking => (
              <div key={booking.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50 transition-colors">
                
                {/* Property Image */}
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative">
                  {booking.properties?.property_images?.[0]?.url ? (
                    <img src={booking.properties.property_images[0].url} alt={booking.properties.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><FiHome /></div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge status={booking.status} />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/properties/${booking.property_id}`} className="text-lg font-bold text-navy-900 hover:text-crimson-600 transition-colors inline-block mb-1">
                      {booking.properties?.name}
                    </Link>
                    <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-3">
                      <FiMapPin /> {booking.properties?.location}, {booking.properties?.city}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm bg-blue-50 text-navy-800 p-3 rounded-lg inline-flex">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="text-blue-500" />
                        <span className="font-medium">{formatDate(booking.booking_date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiClock className="text-blue-500" />
                        <span className="font-medium">{formatTime(booking.booking_time)}</span>
                      </div>
                    </div>
                  </div>

                  {booking.admin_notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700">
                      <span className="font-semibold block mb-1">Message from Admin:</span>
                      {booking.admin_notes}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-center shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                  {booking.status === 'pending' || booking.status === 'approved' ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCancel(booking.id)}
                      isLoading={cancelBooking.isPending && cancelBooking.variables === booking.id}
                      className="w-full md:w-auto border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                      leftIcon={<FiX />}
                    >
                      Cancel Booking
                    </Button>
                  ) : null}
                  
                  {booking.status === 'completed' && (
                    <p className="text-sm text-green-600 font-medium text-center">Viewing Completed</p>
                  )}
                  {booking.status === 'cancelled' && (
                    <p className="text-sm text-gray-500 font-medium text-center">Cancelled</p>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-display font-bold text-navy-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-6">You haven't scheduled any property viewings.</p>
            <Link to="/properties">
              <Button>Browse Properties</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientBookings;
