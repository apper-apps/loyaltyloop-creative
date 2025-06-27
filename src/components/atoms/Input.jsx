import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={leftIcon} size={18} className="text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`
            block w-full rounded-lg border bg-surface/50 backdrop-blur-sm
            ${leftIcon ? 'pl-10' : 'pl-4'}
            ${rightIcon ? 'pr-10' : 'pr-4'}
            py-3 text-white placeholder-gray-400 transition-all duration-200
            ${error 
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/25' 
              : 'border-white/10 focus:border-primary-500 focus:ring-primary-500/25'
            }
            focus:ring-2 focus:ring-offset-0 focus:outline-none
            hover:border-white/20
            ${className}
          `}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon name={rightIcon} size={18} className="text-gray-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-400 flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;