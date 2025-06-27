import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';

const LoyaltyCardPreview = ({ 
  card, 
  size = 'md',
  showBack = false,
  className = '' 
}) => {
  const sizes = {
    sm: 'w-48 h-28',
    md: 'w-64 h-40',
    lg: 'w-80 h-48'
  };
  
  const textSizes = {
    sm: { title: 'text-sm', business: 'text-xs', points: 'text-lg' },
    md: { title: 'text-base', business: 'text-sm', points: 'text-xl' },
    lg: { title: 'text-lg', business: 'text-base', points: 'text-2xl' }
  };
  
  const gradientStyle = {
    background: `linear-gradient(135deg, ${card.design?.primaryColor || '#6366F1'}, ${card.design?.secondaryColor || '#8B5CF6'})`
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${sizes[size]} ${className}`}
    >
      <Card 
        className="w-full h-full p-4 text-white relative overflow-hidden"
        style={gradientStyle}
        hover={false}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
        
        {/* Card Content */}
        <div className="relative h-full flex flex-col justify-between">
          {!showBack ? (
            <>
              {/* Front Side */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-bold ${textSizes[size].title} mb-1`}>
                    {card.name}
                  </h3>
                  <p className={`opacity-90 ${textSizes[size].business}`}>
                    {card.businessName}
                  </p>
                </div>
                <div className="text-2xl">
                  {card.design?.logo || '🎁'}
                </div>
              </div>
              
              <div className="text-center">
                <p className={`font-bold ${textSizes[size].points}`}>
                  {card.totalPoints || 0} pts
                </p>
                <p className={`opacity-75 ${textSizes[size].business}`}>
                  {card.totalCustomers || 0} members
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Back Side */}
              <div className="text-center space-y-2">
                <p className={`font-semibold ${textSizes[size].business}`}>
                  Rewards Available
                </p>
                <div className="space-y-1">
                  {card.rewards?.slice(0, 3).map((reward, index) => (
                    <div key={reward.id} className={`${textSizes[size].business} opacity-90`}>
                      <span className="font-medium">{reward.pointsCost} pts</span> - {reward.name}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default LoyaltyCardPreview;