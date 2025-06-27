import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'LayoutDashboard', label: 'Dashboard' },
    { path: '/cards', icon: 'CreditCard', label: 'Loyalty Cards' },
    { path: '/customers', icon: 'Users', label: 'Customers' },
    { path: '/analytics', icon: 'BarChart3', label: 'Analytics' },
    { path: '/campaigns', icon: 'Megaphone', label: 'Campaigns' },
    { path: '/settings', icon: 'Settings', label: 'Settings' }
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-surface border-r border-white/10 flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <ApperIcon name="Zap" size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">LoyaltyLoop</h1>
                  <p className="text-xs text-gray-400">Digital Rewards</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ApperIcon 
              name={collapsed ? "ChevronRight" : "ChevronLeft"} 
              size={20} 
              className="text-gray-400" 
            />
          </motion.button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group
              ${isActive 
                ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <ApperIcon 
              name={item.icon} 
              size={20} 
              className={location.pathname === item.path ? 'text-primary-400' : ''} 
            />
            
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={16} className="text-white" />
          </div>
          
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-white truncate">Business Owner</p>
                <p className="text-xs text-gray-400 truncate">Pro Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;