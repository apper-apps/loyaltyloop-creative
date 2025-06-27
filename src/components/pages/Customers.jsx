import { motion } from 'framer-motion';
import CustomerList from '@/components/organisms/CustomerList';

const Customers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <CustomerList />
    </motion.div>
  );
};

export default Customers;