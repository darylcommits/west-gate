import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { signIn, isSigningIn } = useAuth();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn({ email: data.email, password: data.password });
      navigate('/admin/dashboard');
    } catch (error) {
      const errorMsg = error.message === 'Email not confirmed' 
        ? 'Please confirm your email first. Go to Supabase > Authentication > Users, and select "Auto Confirm User".'
        : (error.message || 'Invalid credentials or not an admin account.');
      setError('root', { message: errorMsg });
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-crimson-600/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-navy-700/40 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back to site link */}
        <div className="mb-8 text-center">
          <Link to="/" className="text-sm text-cream-200/60 hover:text-crimson-500 transition-colors inline-flex items-center gap-1">
            ← Back to West Gate Realty
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Logo & Title */}
          <div className="text-center mb-10">
            <img src="/logo.jpg" alt="West Gate Realty Services" className="h-20 object-contain mx-auto mb-6 rounded-2xl shadow-xl shadow-black/20" />
            <h1 className="text-2xl font-display font-bold text-white">Admin Portal</h1>
            <p className="mt-2 text-cream-200/60 text-sm">West Gate Realty Services — Staff Only</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <Input
                id="admin-email"
                type="email"
                label="Email Address"
                placeholder="admin@westgaterealty.com"
                labelClassName="text-cream-200/80"
                className="bg-white/10 border-white/20 text-white placeholder-white/30 focus:border-crimson-500 focus:ring-crimson-500/20 pl-10"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={errors.email?.message}
              />
              <FiMail className="absolute left-3 top-9 text-white/40" />
            </div>

            <div className="relative">
              <Input
                id="admin-password"
                type="password"
                label="Password"
                placeholder="••••••••"
                labelClassName="text-cream-200/80"
                className="bg-white/10 border-white/20 text-white placeholder-white/30 focus:border-crimson-500 focus:ring-crimson-500/20 pl-10"
                {...register('password', { required: 'Password is required' })}
                error={errors.password?.message}
              />
              <FiLock className="absolute left-3 top-9 text-white/40" />
            </div>

            {errors.root && (
              <div className="bg-crimson-500/20 border border-crimson-500/50 text-crimson-300 text-sm p-3 rounded-xl">
                {errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full h-12 bg-crimson-600 hover:bg-crimson-700 border-0 shadow-lg shadow-crimson-600/30 mt-2"
              isLoading={isSigningIn}
            >
              Sign In to Admin Panel
            </Button>
          </form>
        </div>

        <p className="text-center text-cream-200/30 text-xs mt-6">
          This portal is restricted to authorized West Gate Realty staff only.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
