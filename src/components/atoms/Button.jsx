import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg shadow-primary-500/25 focus:ring-primary-500',
    secondary: 'bg-surface hover:bg-surface/80 text-white border border-white/10 hover:border-white/20 focus:ring-white/25',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5 focus:ring-white/25',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 focus:ring-red-500',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25 focus:ring-green-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" size={18} className="animate-spin mr-2" />
      ) : leftIcon ? (
        <ApperIcon name={leftIcon} size={18} className="mr-2" />
      ) : null}
      
      {children}
      
      {!loading && rightIcon && (
        <ApperIcon name={rightIcon} size={18} className="ml-2" />
      )}
    </motion.button>
  );
};

export default Button;