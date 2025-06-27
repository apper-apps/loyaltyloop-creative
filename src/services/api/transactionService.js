import transactionsData from '../mockData/transactions.json';

class TransactionService {
  constructor() {
    this.transactions = [...transactionsData];
  }

  async getAll() {
    await this.simulateDelay();
    return [...this.transactions];
  }

  async getByCustomerId(customerId) {
    await this.simulateDelay();
    return this.transactions.filter(t => t.customerId === parseInt(customerId));
  }

  async getByCardId(cardId) {
    await this.simulateDelay();
    return this.transactions.filter(t => t.cardId === parseInt(cardId));
  }

  async create(transactionData) {
    await this.simulateDelay();
    const newTransaction = {
      ...transactionData,
      Id: Math.max(...this.transactions.map(t => t.Id)) + 1,
      timestamp: new Date().toISOString()
    };
    this.transactions.push(newTransaction);
    return { ...newTransaction };
  }

  async getRecentTransactions(limit = 10) {
    await this.simulateDelay();
    return [...this.transactions]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  async getAnalytics(dateRange = 30) {
    await this.simulateDelay();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - dateRange);

    const recentTransactions = this.transactions.filter(
      t => new Date(t.timestamp) >= cutoffDate
    );

    const totalEarned = recentTransactions
      .filter(t => t.type === 'earn')
      .reduce((sum, t) => sum + t.points, 0);

    const totalRedeemed = recentTransactions
      .filter(t => t.type === 'redeem')
      .reduce((sum, t) => sum + Math.abs(t.points), 0);

    const totalRevenue = recentTransactions
      .filter(t => t.amount)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalEarned,
      totalRedeemed,
      totalRevenue,
      transactionCount: recentTransactions.length,
      averageTransaction: totalRevenue / (recentTransactions.filter(t => t.amount).length || 1)
    };
  }

  simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export default new TransactionService();