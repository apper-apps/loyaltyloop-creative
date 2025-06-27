import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = 'Something went wrong. Please try again.',
  onRetry,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" size={32} className="text-red-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-400 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 
                     text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" size={18} />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;