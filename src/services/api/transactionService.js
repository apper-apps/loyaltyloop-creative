import { toast } from 'react-toastify';

class TransactionService {
  constructor() {
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "points" } },
          { field: { Name: "amount" } },
          { field: { Name: "description" } },
          { field: { Name: "timestamp" } },
          { 
            field: { name: "customerId" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { name: "cardId" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [{
          fieldName: "timestamp",
          sorttype: "DESC"
        }]
      };

      const response = await this.apperClient.fetchRecords('transaction', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to load transactions");
      return [];
    }
  }

  async getByCustomerId(customerId) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "points" } },
          { field: { Name: "amount" } },
          { field: { Name: "description" } },
          { field: { Name: "timestamp" } },
          { field: { name: "customerId" } },
          { field: { name: "cardId" } }
        ],
        where: [{
          FieldName: "customerId",
          Operator: "EqualTo",
          Values: [parseInt(customerId)]
        }],
        orderBy: [{
          fieldName: "timestamp",
          sorttype: "DESC"
        }]
      };

      const response = await this.apperClient.fetchRecords('transaction', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching customer transactions:", error);
      toast.error("Failed to load customer transactions");
      return [];
    }
  }

  async getByCardId(cardId) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "points" } },
          { field: { Name: "amount" } },
          { field: { Name: "description" } },
          { field: { Name: "timestamp" } },
          { field: { name: "customerId" } },
          { field: { name: "cardId" } }
        ],
        where: [{
          FieldName: "cardId",
          Operator: "EqualTo",
          Values: [parseInt(cardId)]
        }],
        orderBy: [{
          fieldName: "timestamp",
          sorttype: "DESC"
        }]
      };

      const response = await this.apperClient.fetchRecords('transaction', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching card transactions:", error);
      toast.error("Failed to load card transactions");
      return [];
    }
  }

  async create(transactionData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const updateableData = {
        Name: transactionData.Name || `Transaction ${Date.now()}`,
        type: transactionData.type,
        points: transactionData.points,
        amount: transactionData.amount,
        description: transactionData.description,
        timestamp: transactionData.timestamp || new Date().toISOString(),
        customerId: parseInt(transactionData.customerId),
        cardId: parseInt(transactionData.cardId)
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.createRecord('transaction', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success('Transaction created successfully');
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("Failed to create transaction");
      return null;
    }
  }

  async getRecentTransactions(limit = 10) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "points" } },
          { field: { Name: "amount" } },
          { field: { Name: "description" } },
          { field: { Name: "timestamp" } },
          { 
            field: { name: "customerId" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { name: "cardId" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [{
          fieldName: "timestamp",
          sorttype: "DESC"
        }],
        pagingInfo: {
          limit: limit,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords('transaction', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      toast.error("Failed to load recent transactions");
      return [];
    }
  }

  async getAnalytics(dateRange = 30) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - dateRange);
      const cutoffDateString = cutoffDate.toISOString().split('T')[0];

      const params = {
        fields: [
          { field: { Name: "type" } },
          { field: { Name: "points" } },
          { field: { Name: "amount" } },
          { field: { Name: "timestamp" } }
        ],
        where: [{
          FieldName: "timestamp",
          Operator: "GreaterThanOrEqualTo",
          Values: [cutoffDateString]
        }]
      };

      const response = await this.apperClient.fetchRecords('transaction', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return {
          totalEarned: 0,
          totalRedeemed: 0,
          totalRevenue: 0,
          transactionCount: 0,
          averageTransaction: 0
        };
      }

      const transactions = response.data || [];
      
      const totalEarned = transactions
        .filter(t => t.type === 'earn')
        .reduce((sum, t) => sum + (t.points || 0), 0);

      const totalRedeemed = transactions
        .filter(t => t.type === 'redeem')
        .reduce((sum, t) => sum + Math.abs(t.points || 0), 0);

      const totalRevenue = transactions
        .filter(t => t.amount)
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      const revenueTransactions = transactions.filter(t => t.amount);

      return {
        totalEarned,
        totalRedeemed,
        totalRevenue,
        transactionCount: transactions.length,
        averageTransaction: totalRevenue / (revenueTransactions.length || 1)
      };
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analytics");
      return {
        totalEarned: 0,
        totalRedeemed: 0,
        totalRevenue: 0,
        transactionCount: 0,
        averageTransaction: 0
      };
    }
  }
}

export default new TransactionService();