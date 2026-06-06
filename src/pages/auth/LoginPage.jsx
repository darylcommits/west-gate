import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isSigningIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    try {
      await signIn({ email: data.email, password: data.password });
      // Redirect handled by Auth guard normally, but we can push to dashboard
      // The ProtectedRoute will redirect based on role if they try to access a protected route
    } catch (error) {
      // Error handled by mutation hook toast
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-navy-900 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-navy-900/20 transform rotate-12">
            <span className="text-crimson-500 font-display font-bold text-3xl -rotate-12">WG</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-navy-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your West Gate account</p>
        </div>

        <div className="bg-white py-8 px-4 sm:px-10 rounded-2xl shadow-xl shadow-navy-900/5 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
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
                {...register('password', { required: 'Password is required' })}
                error={errors.password?.message}
                className="pl-10"
              />
              <FiLock className="absolute left-3 top-9 text-gray-400" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-crimson-600 focus:ring-crimson-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-crimson-600 hover:text-crimson-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isSigningIn}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/register" className="font-medium text-crimson-600 hover:text-crimson-500">
                Register a new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
