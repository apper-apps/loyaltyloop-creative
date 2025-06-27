import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import customerService from '@/services/api/customerService';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await customerService.getAll();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(query.toLowerCase()) ||
      customer.email.toLowerCase().includes(query.toLowerCase()) ||
      customer.phone.includes(query)
    );
    setFilteredCustomers(filtered);
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Platinum': return 'text-purple-400 bg-purple-500/20';
      case 'Gold': return 'text-yellow-400 bg-yellow-500/20';
      case 'Silver': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-orange-400 bg-orange-500/20';
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCustomers} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Customers</h2>
          <p className="text-gray-400">Manage your loyalty program members</p>
        </div>
        <div className="flex gap-3">
          <SearchBar
            placeholder="Search customers..."
            onSearch={handleSearch}
            className="w-full sm:w-80"
          />
          <Button leftIcon="UserPlus">Add Customer</Button>
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <Empty
          title={searchQuery ? "No customers found" : "No customers yet"}
          description={searchQuery ? "Try adjusting your search terms." : "Start building your customer base by adding your first loyalty program member."}
          icon="Users"
          actionLabel={!searchQuery ? "Add First Customer" : undefined}
          onAction={!searchQuery ? () => {} : undefined}
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface/50 border-b border-white/10">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-300">Customer</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-300">Tier</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-300">Points</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-300">Visits</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-300">Lifetime Value</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-300">Last Activity</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-surface/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {customer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{customer.name}</p>
                          <p className="text-sm text-gray-400">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(customer.tier)}`}>
                        {customer.tier}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-white">{customer.totalPoints}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-white">{customer.visitCount}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-green-400">${customer.lifetimeSpent?.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400 text-sm">
                        {format(new Date(customer.lastActivity), 'MMM dd, yyyy')}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" leftIcon="Eye">
                          View
                        </Button>
                        <Button variant="ghost" size="sm" leftIcon="Edit">
                          Edit
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CustomerList;