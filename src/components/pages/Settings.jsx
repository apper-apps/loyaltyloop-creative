import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';
const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and loyalty program preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Business Profile */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <ApperIcon name="Building2" size={20} />
              Business Profile
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Business Name"
                  defaultValue="My Business"
                  placeholder="Enter business name"
                />
                <Input
                  label="Industry"
                  defaultValue="Retail"
                  placeholder="Select industry"
                />
              </div>
              
              <Input
                label="Business Description"
                defaultValue="We create amazing customer experiences"
                placeholder="Describe your business"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  defaultValue="contact@business.com"
                  placeholder="Business email"
                />
                <Input
                  label="Phone"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  placeholder="Business phone"
                />
              </div>
              
              <div className="flex justify-end">
<Button onClick={() => toast.success('Business profile updated successfully!')}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>

          {/* Loyalty Program Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <ApperIcon name="CreditCard" size={20} />
              Loyalty Program Settings
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Default Points per Dollar"
                  type="number"
                  defaultValue="10"
                  placeholder="10"
                />
                <Input
                  label="Minimum Redemption Points"
                  type="number"
                  defaultValue="100"
                  placeholder="100"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Point Expiry (Days)"
                  type="number"
                  defaultValue="365"
                  placeholder="365"
                />
                <Input
                  label="Welcome Bonus Points"
                  type="number"
                  defaultValue="50"
                  placeholder="50"
                />
              </div>
              
              <div className="flex justify-end">
<Button onClick={() => toast.success('Loyalty program settings updated!')}>
                  Update Settings
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
<button 
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                onClick={() => toast.info('Data export feature coming soon!')}
              >
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Download" size={18} className="text-primary-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Export Data</p>
                  <p className="text-sm text-gray-400">Download customer data</p>
                </div>
              </button>

<button 
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                onClick={() => toast.info('Email template editor coming soon!')}
              >
                <div className="w-10 h-10 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Mail" size={18} className="text-secondary-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Email Templates</p>
                  <p className="text-sm text-gray-400">Customize notifications</p>
                </div>
              </button>

<button 
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                onClick={() => toast.info('Brand customization tools coming soon!')}
              >
                <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Palette" size={18} className="text-accent-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Brand Colors</p>
                  <p className="text-sm text-gray-400">Customize appearance</p>
                </div>
              </button>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Notifications</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">New Customer</p>
                  <p className="text-sm text-gray-400">When someone joins</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Point Redemption</p>
                  <p className="text-sm text-gray-400">When points are redeemed</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Weekly Reports</p>
                  <p className="text-sm text-gray-400">Performance summaries</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Plan Information */}
          <Card className="p-6 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-primary-500/20">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ApperIcon name="Crown" size={20} className="text-primary-400" />
              Current Plan
            </h2>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold gradient-text mb-2">Pro Plan</h3>
              <p className="text-gray-300 mb-4">Unlimited cards & customers</p>
<Button 
                variant="secondary" 
                size="sm" 
                className="w-full"
                onClick={() => toast.info('Subscription management coming soon!')}
              >
                Manage Subscription
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;