import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = 'No data found',
  description = 'Get started by creating your first item.',
  icon = 'Package',
  actionLabel,
  onAction,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 
                      rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={40} className="text-primary-400" />
      </div>
      
      <h3 className="text-2xl font-bold gradient-text mb-3">
        {title}
      </h3>
      
      <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 
                     text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 
                     shadow-lg shadow-primary-500/25 flex items-center gap-3"
        >
          <ApperIcon name="Plus" size={20} />
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;