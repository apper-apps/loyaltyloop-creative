import { motion } from 'framer-motion';
import CardGallery from '@/components/organisms/CardGallery';

const Cards = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <CardGallery />
    </motion.div>
  );
};

export default Cards;