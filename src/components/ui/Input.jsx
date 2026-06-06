import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Input = forwardRef(({ label, error, className, id, labelClassName, ...props }, ref) => {
  const inputId = id || Math.random().toString(36).substring(7);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={cn("block text-sm font-medium text-navy-800 mb-1.5", labelClassName)}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "input-field",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export const Select = forwardRef(({ label, options, error, className, id, labelClassName, ...props }, ref) => {
  const selectId = id || Math.random().toString(36).substring(7);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className={cn("block text-sm font-medium text-navy-800 mb-1.5", labelClassName)}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          "input-field appearance-none bg-white",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export const Textarea = forwardRef(({ label, error, className, id, rows = 4, labelClassName, ...props }, ref) => {
  const textareaId = id || Math.random().toString(36).substring(7);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className={cn("block text-sm font-medium text-navy-800 mb-1.5", labelClassName)}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          "input-field resize-y",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
