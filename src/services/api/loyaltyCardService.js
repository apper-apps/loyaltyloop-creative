import loyaltyCardsData from '../mockData/loyaltyCards.json';

class LoyaltyCardService {
  constructor() {
    this.cards = [...loyaltyCardsData];
  }

  async getAll() {
    await this.simulateDelay();
    return [...this.cards];
  }

  async getById(id) {
    await this.simulateDelay();
    const card = this.cards.find(c => c.Id === parseInt(id));
    if (!card) {
      throw new Error('Loyalty card not found');
    }
    return { ...card };
  }

  async create(cardData) {
    await this.simulateDelay();
    const newCard = {
      ...cardData,
      Id: Math.max(...this.cards.map(c => c.Id)) + 1,
      createdDate: new Date().toISOString().split('T')[0],
      totalCustomers: 0,
      totalPoints: 0,
      redemptions: 0,
      status: 'active'
    };
    this.cards.push(newCard);
    return { ...newCard };
  }

  async update(id, cardData) {
    await this.simulateDelay();
    const index = this.cards.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Loyalty card not found');
    }
    this.cards[index] = { ...this.cards[index], ...cardData };
    return { ...this.cards[index] };
  }

  async delete(id) {
    await this.simulateDelay();
    const index = this.cards.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Loyalty card not found');
    }
    this.cards.splice(index, 1);
    return { success: true };
  }

  async getCardTemplates() {
    await this.simulateDelay();
    return [
      {
        id: 'coffee',
        name: 'Coffee Shop',
        colors: ['#8B4513', '#D2691E'],
        icon: '☕',
        pattern: 'beans'
      },
      {
        id: 'restaurant',
        name: 'Restaurant',
        colors: ['#DC2626', '#F59E0B'],
        icon: '🍕',
        pattern: 'circles'
      },
      {
        id: 'fashion',
        name: 'Fashion',
        colors: ['#EC4899', '#8B5CF6'],
        icon: '👗',
        pattern: 'geometric'
      },
      {
        id: 'fitness',
        name: 'Fitness',
        colors: ['#10B981', '#059669'],
        icon: '💪',
        pattern: 'waves'
      },
      {
        id: 'beauty',
        name: 'Beauty & Spa',
        colors: ['#F472B6', '#BE185D'],
        icon: '💄',
        pattern: 'flowers'
      },
      {
        id: 'retail',
        name: 'Retail Store',
        colors: ['#3B82F6', '#1D4ED8'],
        icon: '🛍️',
        pattern: 'squares'
      }
    ];
  }

  simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export default new LoyaltyCardService();