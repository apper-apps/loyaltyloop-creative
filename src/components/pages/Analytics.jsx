import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import MetricCard from '@/components/molecules/MetricCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import Chart from 'react-apexcharts';
import transactionService from '@/services/api/transactionService';
import loyaltyCardService from '@/services/api/loyaltyCardService';
import customerService from '@/services/api/customerService';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError('');

      const [transactionAnalytics, cards, customers] = await Promise.all([
        transactionService.getAnalytics(30),
        loyaltyCardService.getAll(),
        customerService.getAll()
      ]);

      // Calculate additional metrics
      const activeCards = cards.filter(card => card.status === 'active').length;
      const avgPointsPerCustomer = customers.length > 0 
        ? customers.reduce((sum, customer) => sum + customer.totalPoints, 0) / customers.length 
        : 0;

      setAnalytics({
        ...transactionAnalytics,
        activeCards,
        totalCards: cards.length,
        totalCustomers: customers.length,
        avgPointsPerCustomer: Math.round(avgPointsPerCustomer),
        redemptionRate: transactionAnalytics.totalRedeemed > 0 
          ? ((transactionAnalytics.totalRedeemed / transactionAnalytics.totalEarned) * 100).toFixed(1)
          : 0
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Chart configurations
  const pointsChartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      background: 'transparent'
    },
    theme: { mode: 'dark' },
    colors: ['#6366F1', '#8B5CF6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      labels: { style: { colors: '#9CA3AF' } }
    },
    yaxis: {
      labels: { style: { colors: '#9CA3AF' } }
    },
    grid: {
      borderColor: '#374151',
      strokeDashArray: 4
    },
    legend: { labels: { colors: '#9CA3AF' } }
  };

  const pointsChartData = [
    {
      name: 'Points Earned',
      data: [320, 450, 380, 520]
    },
    {
      name: 'Points Redeemed',
      data: [180, 220, 190, 280]
    }
  ];

  const revenueChartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent'
    },
    theme: { mode: 'dark' },
    colors: ['#EC4899'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '60%'
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#9CA3AF' } }
    },
    yaxis: {
      labels: { 
        style: { colors: '#9CA3AF' },
        formatter: (value) => `$${value}`
      }
    },
    grid: {
      borderColor: '#374151',
      strokeDashArray: 4
    }
  };

  const revenueChartData = [
    {
      name: 'Revenue',
      data: [1200, 1900, 1400, 2100, 1800, 2400]
    }
  ];

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse h-32 bg-surface/50 rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80 bg-surface/50 rounded-xl animate-pulse"></div>
          <div className="h-80 bg-surface/50 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadAnalytics} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Analytics Overview</h1>
        <p className="text-gray-400">Track your loyalty program performance and customer engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${analytics.totalRevenue.toLocaleString()}`}
          change="+18%"
          changeType="positive"
          icon="DollarSign"
        />
        <MetricCard
          title="Points Earned"
          value={analytics.totalEarned.toLocaleString()}
          change="+23%"
          changeType="positive"
          icon="TrendingUp"
        />
        <MetricCard
          title="Points Redeemed"
          value={analytics.totalRedeemed.toLocaleString()}
          change="+15%"
          changeType="positive"
          icon="Gift"
        />
        <MetricCard
          title="Redemption Rate"
          value={`${analytics.redemptionRate}%`}
          change="+5%"
          changeType="positive"
          icon="Percent"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Points Activity</h3>
          <Chart
            options={pointsChartOptions}
            series={pointsChartData}
            type="area"
            height={300}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Revenue</h3>
          <Chart
            options={revenueChartOptions}
            series={revenueChartData}
            type="bar"
            height={300}
          />
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Users" size={32} className="text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{analytics.totalCustomers}</h3>
          <p className="text-gray-400">Total Customers</p>
          <p className="text-sm text-green-400 mt-2">+12% this month</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="CreditCard" size={32} className="text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{analytics.activeCards}</h3>
          <p className="text-gray-400">Active Cards</p>
          <p className="text-sm text-green-400 mt-2">{analytics.totalCards} total</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Star" size={32} className="text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{analytics.avgPointsPerCustomer}</h3>
          <p className="text-gray-400">Avg Points/Customer</p>
          <p className="text-sm text-green-400 mt-2">+8% this month</p>
        </Card>
      </div>
    </motion.div>
  );
};

export default Analytics;