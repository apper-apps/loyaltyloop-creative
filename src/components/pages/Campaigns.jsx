import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';

const Campaigns = () => {
  const campaigns = []; // Empty for now - will be populated in future

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Marketing Campaigns</h1>
          <p className="text-gray-400">Create and manage promotional campaigns for your loyalty programs</p>
        </div>
        <Button leftIcon="Plus">Create Campaign</Button>
      </div>

      {/* Campaign Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center hover:border-primary-500/30 cursor-pointer transition-all">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Percent" size={32} className="text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Bonus Points</h3>
          <p className="text-gray-400 text-sm mb-4">Offer extra points for specific actions or purchases</p>
          <Button variant="secondary" size="sm" className="w-full">Create</Button>
        </Card>

        <Card className="p-6 text-center hover:border-secondary-500/30 cursor-pointer transition-all">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary-500/20 to-secondary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Users" size={32} className="text-secondary-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Referral Program</h3>
          <p className="text-gray-400 text-sm mb-4">Reward customers for bringing in new members</p>
          <Button variant="secondary" size="sm" className="w-full">Create</Button>
        </Card>

        <Card className="p-6 text-center hover:border-accent-500/30 cursor-pointer transition-all">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Calendar" size={32} className="text-accent-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Seasonal Offers</h3>
          <p className="text-gray-400 text-sm mb-4">Time-limited promotions for holidays and events</p>
          <Button variant="secondary" size="sm" className="w-full">Create</Button>
        </Card>
      </div>

      {/* Active Campaigns */}
      {campaigns.length === 0 ? (
        <Empty
          title="No active campaigns"
          description="Create your first marketing campaign to boost customer engagement and drive more loyalty program participation."
          icon="Megaphone"
          actionLabel="Create Your First Campaign"
          onAction={() => {}}
        />
      ) : (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Active Campaigns</h2>
          {/* Campaign list will go here */}
        </Card>
      )}

      {/* Campaign Ideas */}
      <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <ApperIcon name="Lightbulb" size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Campaign Ideas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-300 mb-1">Double Points Weekend</h4>
                <p className="text-gray-300">Offer 2x points for all purchases during weekends</p>
              </div>
              <div>
                <h4 className="font-medium text-purple-300 mb-1">Birthday Bonus</h4>
                <p className="text-gray-300">Give special rewards to customers on their birthday</p>
              </div>
              <div>
                <h4 className="font-medium text-green-300 mb-1">Streak Rewards</h4>
                <p className="text-gray-300">Bonus for consecutive days of engagement</p>
              </div>
              <div>
                <h4 className="font-medium text-pink-300 mb-1">Social Sharing</h4>
                <p className="text-gray-300">Points for sharing your business on social media</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Campaigns;