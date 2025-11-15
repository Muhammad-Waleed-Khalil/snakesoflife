import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-venom font-bold mb-2 text-sm uppercase tracking-wide">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-3 bg-abyss border-2 rounded-lg',
            'text-white placeholder-gray-500',
            'focus:outline-none focus:ring-2 transition-all',
            error
              ? 'border-blood focus:border-blood focus:ring-blood/50'
              : 'border-venom/30 focus:border-venom focus:ring-venom/30',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-blood">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-venom font-bold mb-2 text-sm uppercase tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'w-full px-4 py-3 bg-abyss border-2 rounded-lg',
            'text-white placeholder-gray-500',
            'focus:outline-none focus:ring-2 transition-all',
            'resize-none',
            error
              ? 'border-blood focus:border-blood focus:ring-blood/50'
              : 'border-venom/30 focus:border-venom focus:ring-venom/30',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-blood">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
