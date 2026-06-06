import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { signUp, isSigningUp } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phone: data.phone
      });
      navigate('/login');
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-navy-900">Create an Account</h2>
          <p className="mt-2 text-gray-600">Join West Gate Realty Services</p>
        </div>

        <div className="bg-white py-8 px-4 sm:px-10 rounded-2xl shadow-xl shadow-navy-900/5 border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="relative">
              <Input
                id="fullName"
                type="text"
                label="Full Name"
                placeholder="Juan Dela Cruz"
                {...register('fullName', { required: 'Full name is required' })}
                error={errors.fullName?.message}
                className="pl-10"
              />
              <FiUser className="absolute left-3 top-9 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                id="phone"
                type="tel"
                label="Phone Number"
                placeholder="+63 900 000 0000"
                {...register('phone', { required: 'Phone number is required' })}
                error={errors.phone?.message}
                className="pl-10"
              />
              <FiPhone className="absolute left-3 top-9 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                error={errors.email?.message}
                className="pl-10"
              />
              <FiMail className="absolute left-3 top-9 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                error={errors.password?.message}
                className="pl-10"
              />
              <FiLock className="absolute left-3 top-9 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                error={errors.confirmPassword?.message}
                className="pl-10"
              />
              <FiLock className="absolute left-3 top-9 text-gray-400" />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isSigningUp}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-crimson-600 hover:text-crimson-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
