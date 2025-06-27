import { motion } from 'framer-motion';

const Loading = ({ type = 'default', className = '' }) => {
  if (type === 'skeleton') {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className="shimmer h-4 bg-white/10 rounded w-3/4"></div>
        <div className="shimmer h-4 bg-white/10 rounded w-1/2"></div>
        <div className="shimmer h-4 bg-white/10 rounded w-5/6"></div>
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="shimmer bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 h-48">
              <div className="h-4 bg-white/20 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-white/15 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-white/15 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center space-x-4 p-4 bg-surface/50 rounded-lg">
            <div className="shimmer h-10 w-10 bg-white/10 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="shimmer h-4 bg-white/10 rounded w-1/4"></div>
              <div className="shimmer h-3 bg-white/10 rounded w-1/3"></div>
            </div>
            <div className="shimmer h-4 bg-white/10 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full"
      />
    </div>
  );
};

export default Loading;