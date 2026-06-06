import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Input, Textarea, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { useUiStore } from '../../store/uiStore';
import { useAuth } from '../../hooks/useAuth';
import { useCreateBooking } from '../../hooks/useBookings';
import { TIME_SLOTS } from '../../lib/constants';

export const BookingModal = () => {
  const navigate = useNavigate();
  const { bookingModal, closeBookingModal } = useUiStore();
  const { isOpen, propertyId, property } = bookingModal;
  const { isAuthenticated, user } = useAuth();
  const createBooking = useCreateBooking();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      closeBookingModal();
      navigate('/login');
      return;
    }

    try {
      await createBooking.mutateAsync({
        property_id: propertyId,
        client_id: user.id,
        booking_date: data.date,
        booking_time: data.time,
        notes: data.notes,
        status: 'pending'
      });
      reset();
      closeBookingModal();
    } catch (error) {
      // Handled by mutation hook
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeBookingModal}
      title="Schedule a Viewing"
    >
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">You are booking a viewing for:</p>
        <p className="font-semibold text-navy-900">{property?.name}</p>
        <p className="text-sm text-navy-600">{property?.location}, {property?.city}</p>
      </div>

      {!isAuthenticated ? (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4 text-center">
          <p className="text-navy-800 mb-3 text-sm">Please sign in to schedule a property viewing.</p>
          <Button 
            variant="primary" 
            className="w-full"
            onClick={() => {
              closeBookingModal();
              navigate('/login', { state: { returnTo: `/properties/${propertyId}` }});
            }}
          >
            Sign In to Book
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Preferred Date"
            type="date"
            {...register('date', { required: 'Please select a date' })}
            error={errors.date?.message}
            min={new Date().toISOString().split('T')[0]} // Cannot pick past dates
          />

          <Select
            label="Preferred Time"
            options={TIME_SLOTS}
            {...register('time', { required: 'Please select a time' })}
            error={errors.time?.message}
          />

          <Textarea
            label="Additional Notes (Optional)"
            placeholder="Any specific requests or questions?"
            {...register('notes')}
          />

          <div className="pt-4 flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1" 
              onClick={closeBookingModal}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="flex-1"
              isLoading={createBooking.isPending}
            >
              Submit Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
