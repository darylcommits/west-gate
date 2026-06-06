import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const EmptyState = ({
  icon: Icon,
  iconSrc,
  title = 'Nothing here yet',
  description = 'Get started by adding your first item.',
  action,
  actionLabel,
  onAction,
  secondaryAction,
  secondaryLabel,
  onSecondaryAction,
  size = 'md',
  className = '',
  variant = 'default', // 'default' | 'card' | 'inline'
}) => {
  const sizeConfig = {
    sm: {
      icon: 'w-10 h-10',
      iconWrap: 'w-16 h-16',
      title: 'text-base',
      desc: 'text-sm',
      gap: 'gap-3',
    },
    md: {
      icon: 'w-14 h-14',
      iconWrap: 'w-24 h-24',
      title: 'text-xl',
      desc: 'text-base',
      gap: 'gap-4',
    },
    lg: {
      icon: 'w-20 h-20',
      iconWrap: 'w-32 h-32',
      title: 'text-2xl',
      desc: 'text-lg',
      gap: 'gap-5',
    },
  };

  const config = sizeConfig[size] || sizeConfig.md;

  const wrapperClasses = {
    default: 'py-16',
    card: 'py-12 px-8 bg-white rounded-2xl border border-gray-100 shadow-sm',
    inline: 'py-8',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex flex-col items-center justify-center text-center ${config.gap} ${wrapperClasses[variant]} ${className}`}
    >
      {/* Icon */}
      {(Icon || iconSrc) && (
        <div
          className={`flex items-center justify-center ${config.iconWrap} rounded-full bg-[#EDE8E1]`}
        >
          {iconSrc ? (
            <img src={iconSrc} alt="" className={config.icon} />
          ) : Icon ? (
            <Icon className={`${config.icon} text-[#1C2B4A]/40`} />
          ) : null}
        </div>
      )}

      {/* Text */}
      <div className="space-y-1.5 max-w-sm">
        <h3 className={`font-semibold text-[#1C2B4A] ${config.title}`}>{title}</h3>
        {description && (
          <p className={`text-gray-500 leading-relaxed ${config.desc}`}>{description}</p>
        )}
      </div>

      {/* Actions */}
      {(action || onAction || actionLabel) && (
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          {(onAction || action) && (
            <Button
              variant="primary"
              size={size === 'sm' ? 'sm' : 'md'}
              onClick={onAction || (() => {})}
            >
              {actionLabel || 'Get Started'}
            </Button>
          )}
          {(onSecondaryAction || secondaryAction) && (
            <Button
              variant="outline"
              size={size === 'sm' ? 'sm' : 'md'}
              onClick={onSecondaryAction || (() => {})}
            >
              {secondaryLabel || 'Learn More'}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
