import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Spinner } from './Spinner';

export const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  leftIcon, 
  rightIcon, 
  className, 
  disabled,
  as: Component = motion.button,
  ...props 
}, ref) => {
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-crimson',
    outline: 'btn-outline',
    'outline-white': 'btn-outline-white',
    ghost: 'btn-ghost',
    gold: 'bg-crimson-500 text-white font-bold hover:bg-crimson-600 active:bg-crimson-700',
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
    icon: 'p-2',
  };

  const isDisabled = disabled || isLoading;

  return (
    <Component
      ref={ref}
      whileTap={!isDisabled ? { scale: 0.97 } : {}}
      className={cn(
        variants[variant],
        sizes[size],
        isDisabled && 'opacity-60 cursor-not-allowed transform-none hover:shadow-none hover:-translate-y-0 active:scale-100',
        'relative overflow-hidden',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Spinner size="sm" color={variant === 'outline' ? 'navy' : 'white'} />
          <span className="opacity-0">{children}</span> {/* Keep width consistent */}
          <span className="absolute inset-0 flex items-center justify-center">Loading...</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="mr-1">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-1">{rightIcon}</span>}
        </>
      )}
    </Component>
  );
});

Button.displayName = 'Button';
