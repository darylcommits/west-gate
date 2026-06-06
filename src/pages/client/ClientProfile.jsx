import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { FiUser, FiCamera, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ClientProfile = () => {
  const { user, profile } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  // Password change form
  const { 
    register: registerPassword, 
    handleSubmit: handlePasswordSubmit, 
    reset: resetPassword,
    watch: watchPassword,
    formState: { errors: passwordErrors } 
  } = useForm();

  const newPassword = watchPassword('newPassword');

  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        province: profile.province || '',
      });
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile, reset]);

  const onUpdateProfile = async (data) => {
    setIsUpdating(true);
    try {
      await authService.updateProfile(user.id, data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const onChangePassword = async (data) => {
    setIsUpdating(true);
    try {
      await authService.updatePassword(data.newPassword);
      toast.success('Password updated successfully');
      resetPassword();
    } catch (error) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const url = await authService.uploadAvatar(user.id, file);
      setAvatarUrl(url);
      toast.success('Profile picture updated');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy-900">My Profile</h1>
        <p className="text-gray-600">Update your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Account Basics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 group">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="w-full h-full p-6 text-gray-400" />
                )}
              </div>
              
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 w-10 h-10 bg-crimson-600 rounded-full text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-crimson-700 transition-colors"
              >
                {isUploading ? <Spinner size="sm" color="white" /> : <FiCamera className="w-5 h-5" />}
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
                />
              </label>
            </div>
            <h2 className="text-xl font-bold text-navy-900">{profile?.full_name}</h2>
            <p className="text-gray-500 text-sm mb-4">{user?.email}</p>
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider">
              {profile?.role} Account
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy-900 mb-4 flex items-center gap-2">
              <FiLock /> Change Password
            </h3>
            <form onSubmit={handlePasswordSubmit(onChangePassword)} className="space-y-4">
              <Input
                type="password"
                label="New Password"
                {...registerPassword('newPassword', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters required' }
                })}
                error={passwordErrors.newPassword?.message}
              />
              <Input
                type="password"
                label="Confirm New Password"
                {...registerPassword('confirmPassword', { 
                  required: 'Please confirm password',
                  validate: value => value === newPassword || 'Passwords do not match'
                })}
                error={passwordErrors.confirmPassword?.message}
              />
              <Button type="submit" variant="outline" className="w-full" isLoading={isUpdating}>
                Update Password
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Personal Information Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-display font-bold text-navy-900 mb-6 border-b border-gray-100 pb-4">
              Personal Information
            </h2>
            
            <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  {...register('full_name', { required: 'Full name is required' })}
                  error={errors.full_name?.message}
                />
                
                <Input
                  label="Phone Number"
                  {...register('phone')}
                />
              </div>

              <div className="space-y-6 pt-4 border-t border-gray-100">
                <h3 className="font-medium text-navy-800">Address Information</h3>
                
                <Textarea
                  label="Street Address"
                  rows={2}
                  {...register('address')}
                />
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="City/Municipality"
                    {...register('city')}
                  />
                  
                  <Input
                    label="Province"
                    {...register('province')}
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <Button type="submit" variant="primary" isLoading={isUpdating}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientProfile;
