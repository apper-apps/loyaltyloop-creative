import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  gradient = false,
  glass = false,
  ...props 
}) => {
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  let cardClasses = baseClasses;
  
  if (glass) {
    cardClasses += ' glass-effect';
  } else if (gradient) {
    cardClasses += ' bg-gradient-to-br from-surface/80 to-surface/40 border border-white/10';
  } else {
    cardClasses += ' bg-surface border border-white/10';
  }
  
  if (hover) {
    cardClasses += ' hover:border-white/20 hover:shadow-lg hover:shadow-primary-500/10';
  }
  
  const MotionComponent = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -2 },
    transition: { duration: 0.2 }
  } : {};
  
  return (
    <MotionComponent
      className={`${cardClasses} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Card;