import React, { forwardRef } from 'react';
import { ChevronDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Select = forwardRef(
  (
    {
      label,
      id,
      name,
      value,
      onChange,
      onBlur,
      options = [],
      placeholder = 'Select an option',
      error,
      hint,
      disabled = false,
      required = false,
      size = 'md',
      className = '',
      selectClassName = '',
      fullWidth = true,
      prefixIcon,
      groups = null, // array of { label, options: [{value, label}] }
    },
    ref
  ) => {
    const inputId = id || name || `select-${Math.random().toString(36).slice(2)}`;

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    const borderClass = error
      ? 'border-[#C0282B] focus:border-[#C0282B] focus:ring-[#C0282B]/20 bg-red-50'
      : 'border-gray-300 focus:border-[#1C2B4A] focus:ring-[#1C2B4A]/20 bg-white';

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#1C2B4A] mb-1.5"
          >
            {label}
            {required && <span className="text-[#C0282B] ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Prefix icon */}
          {prefixIcon && (
            <div className="pointer-events-none absolute left-3 text-gray-400 z-10">
              {prefixIcon}
            </div>
          )}

          <select
            ref={ref}
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={[
              'block w-full appearance-none rounded-lg border transition-all duration-150 focus:outline-none focus:ring-2 pr-10',
              borderClass,
              sizeClasses[size],
              prefixIcon ? 'pl-10' : '',
              disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer',
              selectClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {placeholder && (
              <option value="" disabled hidden={!value && value !== 0}>
                {placeholder}
              </option>
            )}

            {/* Grouped options */}
            {groups
              ? groups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.disabled}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                ))
              : options.map((opt) =>
                  typeof opt === 'string' ? (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ) : (
                    <option
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                    >
                      {opt.label}
                    </option>
                  )
                )}
          </select>

          {/* Chevron icon */}
          <div className="pointer-events-none absolute right-3 text-gray-400">
            {error ? (
              <ExclamationCircleIcon className="w-5 h-5 text-[#C0282B]" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-[#C0282B] flex items-center gap-1">
            <ExclamationCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </p>
        )}
        {/* Hint */}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
