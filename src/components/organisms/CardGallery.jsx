import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import LoyaltyCardPreview from '@/components/molecules/LoyaltyCardPreview';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import loyaltyCardService from '@/services/api/loyaltyCardService';

const CardGallery = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadCards = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await loyaltyCardService.getAll();
      setCards(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!confirm('Are you sure you want to delete this loyalty card? This action cannot be undone.')) {
      return;
    }

    try {
      await loyaltyCardService.delete(cardId);
      setCards(cards.filter(card => card.Id !== cardId));
      toast.success('Loyalty card deleted successfully');
    } catch (err) {
      toast.error('Failed to delete card: ' + err.message);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCards} />;
  }

  if (cards.length === 0) {
    return (
      <Empty
        title="No Loyalty Cards Yet"
        description="Create your first digital loyalty card to start engaging customers and building lasting relationships."
        icon="CreditCard"
        actionLabel="Create Your First Card"
        onAction={() => navigate('/cards/new')}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Loyalty Cards</h2>
          <p className="text-gray-400">Manage and track your digital reward programs</p>
        </div>
        <Button
          leftIcon="Plus"
          onClick={() => navigate('/cards/new')}
        >
          Create New Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 space-y-6" gradient>
              <LoyaltyCardPreview card={card} size="md" />
              
<div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{card.name || card.Name}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{card.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">{card.totalCustomers || 0}</p>
                    <p className="text-xs text-gray-400">Members</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{card.totalPoints || 0}</p>
                    <p className="text-xs text-gray-400">Points</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{card.redemptions || 0}</p>
                    <p className="text-xs text-gray-400">Redeemed</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon="Edit"
                    onClick={() => navigate(`/cards/${card.Id}/edit`)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon="Eye"
                    onClick={() => navigate(`/cards/${card.Id}`)}
                    className="flex-1"
                  >
                    View
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    leftIcon="Trash2"
                    onClick={() => handleDeleteCard(card.Id)}
                  >
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardGallery;