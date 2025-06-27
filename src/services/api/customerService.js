import customersData from '../mockData/customers.json';

class CustomerService {
  constructor() {
    this.customers = [...customersData];
  }

  async getAll() {
    await this.simulateDelay();
    return [...this.customers];
  }

  async getById(id) {
    await this.simulateDelay();
    const customer = this.customers.find(c => c.Id === parseInt(id));
    if (!customer) {
      throw new Error('Customer not found');
    }
    return { ...customer };
  }

  async create(customerData) {
    await this.simulateDelay();
    const newCustomer = {
      ...customerData,
      Id: Math.max(...this.customers.map(c => c.Id)) + 1,
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      totalPoints: 0,
      tier: 'Bronze',
      lifetimeSpent: 0,
      visitCount: 0,
      cards: []
    };
    this.customers.push(newCustomer);
    return { ...newCustomer };
  }

  async update(id, customerData) {
    await this.simulateDelay();
    const index = this.customers.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Customer not found');
    }
    this.customers[index] = { ...this.customers[index], ...customerData };
    return { ...this.customers[index] };
  }

  async delete(id) {
    await this.simulateDelay();
    const index = this.customers.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Customer not found');
    }
    this.customers.splice(index, 1);
    return { success: true };
  }

  async searchCustomers(query) {
    await this.simulateDelay();
    if (!query) return [...this.customers];
    
    const searchTerm = query.toLowerCase();
    return this.customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone.includes(searchTerm)
    );
  }

  simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export default new CustomerService();