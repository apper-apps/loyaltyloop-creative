import { toast } from 'react-toastify';

class CustomerService {
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
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "cards" } },
          { field: { Name: "totalPoints" } },
          { field: { Name: "joinDate" } },
          { field: { Name: "lastActivity" } },
          { field: { Name: "tier" } },
          { field: { Name: "lifetimeSpent" } },
          { field: { Name: "visitCount" } }
        ]
      };

      const response = await this.apperClient.fetchRecords('app_Customer', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to load customers");
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "cards" } },
          { field: { Name: "totalPoints" } },
          { field: { Name: "joinDate" } },
          { field: { Name: "lastActivity" } },
          { field: { Name: "tier" } },
          { field: { Name: "lifetimeSpent" } },
          { field: { Name: "visitCount" } }
        ]
      };

      const response = await this.apperClient.getRecordById('app_Customer', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching customer:", error);
      toast.error("Failed to load customer");
      return null;
    }
  }

  async create(customerData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      // Only include Updateable fields
      const updateableData = {
        Name: customerData.Name || customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        cards: customerData.cards || [],
        totalPoints: customerData.totalPoints || 0,
        joinDate: customerData.joinDate || new Date().toISOString().split('T')[0],
        lastActivity: customerData.lastActivity || new Date().toISOString().split('T')[0],
        tier: customerData.tier || 'Bronze',
        lifetimeSpent: customerData.lifetimeSpent || 0,
        visitCount: customerData.visitCount || 0
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.createRecord('app_Customer', params);
      
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
          toast.success('Customer created successfully');
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating customer:", error);
      toast.error("Failed to create customer");
      return null;
    }
  }

  async update(id, customerData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      // Only include Updateable fields
      const updateableData = {
        Id: parseInt(id),
        Name: customerData.Name || customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        cards: customerData.cards,
        totalPoints: customerData.totalPoints,
        joinDate: customerData.joinDate,
        lastActivity: customerData.lastActivity,
        tier: customerData.tier,
        lifetimeSpent: customerData.lifetimeSpent,
        visitCount: customerData.visitCount
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.updateRecord('app_Customer', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success('Customer updated successfully');
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Failed to update customer");
      return null;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('app_Customer', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success('Customer deleted successfully');
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer");
      return false;
    }
  }

  async searchCustomers(query) {
    try {
      if (!query) return await this.getAll();
      
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "cards" } },
          { field: { Name: "totalPoints" } },
          { field: { Name: "joinDate" } },
          { field: { Name: "lastActivity" } },
          { field: { Name: "tier" } },
          { field: { Name: "lifetimeSpent" } },
          { field: { Name: "visitCount" } }
        ],
        whereGroups: [{
          operator: "OR",
          subGroups: [
            {
              conditions: [{
                fieldName: "Name",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "email",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "phone",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            }
          ]
        }]
      };

      const response = await this.apperClient.fetchRecords('app_Customer', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error searching customers:", error);
      toast.error("Failed to search customers");
      return [];
    }
  }
}

export default new CustomerService();