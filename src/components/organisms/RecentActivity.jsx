import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format, formatDistanceToNow } from 'date-fns';
import Card from '@/components/atoms/Card';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import transactionService from '@/services/api/transactionService';
import customerService from '@/services/api/customerService';

const RecentActivity = () => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [transactionsData, customersData] = await Promise.all([
        transactionService.getRecentTransactions(8),
        customerService.getAll()
      ]);
      
      // Create customer lookup map
      const customerMap = {};
      customersData.forEach(customer => {
        customerMap[customer.Id] = customer;
      });
      
      setTransactions(transactionsData);
      setCustomers(customerMap);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    return type === 'earn' ? 'Plus' : 'Gift';
  };

  const getActivityColor = (type) => {
    return type === 'earn' ? 'text-green-400' : 'text-purple-400';
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <Loading type="skeleton" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <Error message={error} onRetry={loadData} />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="text-primary-400 hover:text-primary-300 text-sm font-medium">
          View All
        </button>
      </div>

      {transactions.length === 0 ? (
        <Empty
          title="No recent activity"
          description="Customer activity will appear here as they earn and redeem points."
          icon="Activity"
        />
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction, index) => {
            const customer = customers[transaction.customerId];
            
            return (
              <motion.div
                key={transaction.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-surface/50 ${getActivityColor(transaction.type)}`}>
                  <ApperIcon name={getActivityIcon(transaction.type)} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
<div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-white truncate">
                      {customer?.Name || customer?.name || 'Unknown Customer'}
                    </p>
                    <span className={`text-sm font-semibold ${getActivityColor(transaction.type)}`}>
                      {transaction.type === 'earn' ? '+' : '-'}{Math.abs(transaction.points)} pts
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {transaction.description}
                    {transaction.amount && ` • $${transaction.amount.toFixed(2)}`}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(transaction.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;