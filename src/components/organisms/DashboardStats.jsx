import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MetricCard from '@/components/molecules/MetricCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import loyaltyCardService from '@/services/api/loyaltyCardService';
import customerService from '@/services/api/customerService';
import transactionService from '@/services/api/transactionService';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalCards: 0,
    totalCustomers: 0,
    totalPoints: 0,
    totalRedemptions: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStats = async () => {
    try {
      setLoading(true);
      setError('');

      const [cards, customers, analytics] = await Promise.all([
        loyaltyCardService.getAll(),
        customerService.getAll(),
        transactionService.getAnalytics()
      ]);

      const totalPoints = cards.reduce((sum, card) => sum + (card.totalPoints || 0), 0);
      const totalRedemptions = cards.reduce((sum, card) => sum + (card.redemptions || 0), 0);

      setStats({
        totalCards: cards.length,
        totalCustomers: customers.length,
        totalPoints,
        totalRedemptions,
        revenue: analytics.totalRevenue
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-surface/50 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadStats} />;
  }

  const metrics = [
    {
      title: 'Active Cards',
      value: stats.totalCards,
      change: '+12%',
      changeType: 'positive',
      icon: 'CreditCard'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      change: '+8%',
      changeType: 'positive',
      icon: 'Users'
    },
    {
      title: 'Points Issued',
      value: stats.totalPoints.toLocaleString(),
      change: '+23%',
      changeType: 'positive',
      icon: 'Star'
    },
    {
      title: 'Redemptions',
      value: stats.totalRedemptions,
      change: '+15%',
      changeType: 'positive',
      icon: 'Gift'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: '+18%',
      changeType: 'positive',
      icon: 'DollarSign'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <MetricCard {...metric} />
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;