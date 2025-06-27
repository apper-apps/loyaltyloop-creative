import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const MetricCard = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  gradient = false,
  className = ''
}) => {
  const changeColor = changeType === 'positive' ? 'text-green-400' : 'text-red-400';
  const changeIcon = changeType === 'positive' ? 'TrendingUp' : 'TrendingDown';
  
  return (
    <Card className={`p-6 ${className}`} gradient={gradient}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{value}</p>
          
          {change && (
            <div className={`flex items-center gap-1 text-sm ${changeColor}`}>
              <ApperIcon name={changeIcon} size={14} />
              <span>{change}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 
                          rounded-lg flex items-center justify-center">
            <ApperIcon name={icon} size={24} className="text-primary-400" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;