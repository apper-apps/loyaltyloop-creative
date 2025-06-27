import { motion } from 'framer-motion';
import DashboardStats from '@/components/organisms/DashboardStats';
import RecentActivity from '@/components/organisms/RecentActivity';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Here's what's happening with your loyalty programs today.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            leftIcon="BarChart3"
            onClick={() => navigate('/analytics')}
          >
            View Analytics
          </Button>
          <Button 
            leftIcon="Plus"
            onClick={() => navigate('/cards/new')}
          >
            Create Card
          </Button>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/cards/new')}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="CreditCard" size={20} className="text-primary-400" />
              </div>
              <div>
                <p className="font-medium text-white">Create Loyalty Card</p>
                <p className="text-sm text-gray-400">Design a new reward program</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/customers')}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="UserPlus" size={20} className="text-secondary-400" />
              </div>
              <div>
                <p className="font-medium text-white">Add Customer</p>
                <p className="text-sm text-gray-400">Register a new member</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/campaigns')}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="Megaphone" size={20} className="text-accent-400" />
              </div>
              <div>
                <p className="font-medium text-white">Launch Campaign</p>
                <p className="text-sm text-gray-400">Start a promotional campaign</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/analytics')}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="TrendingUp" size={20} className="text-green-400" />
              </div>
              <div>
                <p className="font-medium text-white">View Reports</p>
                <p className="text-sm text-gray-400">Analyze performance data</p>
              </div>
            </button>
          </div>
        </Card>
      </div>

      {/* Tips Card */}
      <Card className="p-6 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-primary-500/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <ApperIcon name="Lightbulb" size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Pro Tip</h3>
            <p className="text-gray-300 mb-4">
              Increase customer engagement by offering bonus points for referrals and social media shares. 
              This can boost your customer acquisition by up to 40%!
            </p>
            <Button variant="secondary" size="sm">
              Learn More
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Dashboard;