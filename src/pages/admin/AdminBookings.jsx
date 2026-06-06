import { useState } from 'react';
import { useBookings, useUpdateBookingStatus } from '../../hooks/useBookings';
import { FiCheck, FiX, FiCalendar, FiSearch, FiFilter } from 'react-icons/fi';
import { Spinner } from '../../components/ui/Spinner';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Textarea, Select } from '../../components/ui/Input';
import { formatDate, formatTime } from '../../lib/utils';
import { BOOKING_STATUSES } from '../../lib/constants';

const AdminBookings = () => {
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const { data: bookings, isLoading } = useBookings({ status: filter });
  const updateStatus = useUpdateBookingStatus();

  const handleOpenModal = (booking, status) => {
    setSelectedBooking(booking);
    setNewStatus(status);
    setAdminNotes(booking.admin_notes || '');
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    try {
      await updateStatus.mutateAsync({
        id: selectedBooking.id,
        status: newStatus,
        adminNotes: adminNotes
      });
      setIsModalOpen(false);
    } catch (error) {
      // Handled by hook
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Manage Bookings</h1>
          <p className="text-gray-600">Review and manage property viewing requests.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
        <div className="relative w-full sm:w-64">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            className="input-field pl-10 py-2 text-sm appearance-none bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Bookings</option>
            {BOOKING_STATUSES.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : bookings && bookings.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-6 flex flex-col lg:flex-row gap-6 hover:bg-gray-50 transition-colors">
                
                <div className="flex-1 grid md:grid-cols-2 gap-6">
                  {/* Property & Time Info */}
                  <div>
                    <h3 className="font-bold text-navy-900 mb-1">{booking.properties?.name}</h3>
                    <p className="text-sm text-gray-500 font-mono mb-4">{booking.properties?.property_code}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">
                        <FiCalendar className="w-4 h-4" />
                        {formatDate(booking.booking_date)}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">
                        {formatTime(booking.booking_time)}
                      </div>
                    </div>
                    {booking.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 italic border border-gray-100">
                        "{booking.notes}"
                      </div>
                    )}
                  </div>

                  {/* Client Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">Client Details</h4>
                    <p className="font-medium text-navy-900">{booking.profiles?.full_name}</p>
                    <p className="text-sm text-gray-600">{booking.profiles?.email}</p>
                    <p className="text-sm text-gray-600 mb-4">{booking.profiles?.phone || 'No phone provided'}</p>
                    
                    <div>
                      <Badge status={booking.status} className="mb-2" />
                      {booking.admin_notes && (
                        <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded">Note: {booking.admin_notes}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col justify-end lg:justify-center gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                  {booking.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="primary" 
                        className="bg-green-600 hover:bg-green-700 w-full sm:w-auto lg:w-full"
                        onClick={() => handleOpenModal(booking, 'approved')}
                        leftIcon={<FiCheck />}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto lg:w-full"
                        onClick={() => handleOpenModal(booking, 'rejected')}
                        leftIcon={<FiX />}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {booking.status === 'approved' && (
                    <Button 
                      size="sm" 
                      variant="primary" 
                      className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto lg:w-full"
                      onClick={() => handleOpenModal(booking, 'completed')}
                      leftIcon={<FiCheck />}
                    >
                      Mark Completed
                    </Button>
                  )}
                  {booking.status !== 'pending' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full sm:w-auto lg:w-full"
                      onClick={() => handleOpenModal(booking, booking.status)}
                    >
                      Edit Status / Notes
                    </Button>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 text-gray-500">
            No bookings found matching the current filter.
          </div>
        )}
      </div>

      {/* Action Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Booking Status"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Status</label>
            <select
              className="input-field"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {BOOKING_STATUSES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <Textarea
            label="Admin Notes (Sent to client)"
            placeholder="e.g. Please bring a valid ID. We will meet at the lobby."
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
          />

          <div className="pt-4 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="flex-1" 
              onClick={handleUpdateStatus}
              isLoading={updateStatus.isPending}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminBookings;
