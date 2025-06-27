import { toast } from 'react-toastify';

class LoyaltyCardService {
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
          { field: { Name: "businessName" } },
          { field: { Name: "description" } },
          { field: { Name: "design_template" } },
          { field: { Name: "design_primaryColor" } },
          { field: { Name: "design_secondaryColor" } },
          { field: { Name: "design_logo" } },
          { field: { Name: "design_backgroundPattern" } },
          { field: { Name: "pointsConfig_pointsPerDollar" } },
          { field: { Name: "pointsConfig_bonusThreshold" } },
          { field: { Name: "pointsConfig_bonusPoints" } },
          { field: { Name: "rewards" } },
          { field: { Name: "status" } },
          { field: { Name: "createdDate" } },
          { field: { Name: "totalCustomers" } },
          { field: { Name: "totalPoints" } },
          { field: { Name: "redemptions" } }
        ]
      };

      const response = await this.apperClient.fetchRecords('loyalty_card', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform flat database fields back to nested structure for UI compatibility
      const transformedCards = (response.data || []).map(card => ({
        ...card,
        name: card.Name,
        design: {
          template: card.design_template,
          primaryColor: card.design_primaryColor,
          secondaryColor: card.design_secondaryColor,
          logo: card.design_logo,
          backgroundPattern: card.design_backgroundPattern
        },
        pointsConfig: {
          pointsPerDollar: card.pointsConfig_pointsPerDollar,
          bonusThreshold: card.pointsConfig_bonusThreshold,
          bonusPoints: card.pointsConfig_bonusPoints
        }
      }));

      return transformedCards;
    } catch (error) {
      console.error("Error fetching loyalty cards:", error);
      toast.error("Failed to load loyalty cards");
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "businessName" } },
          { field: { Name: "description" } },
          { field: { Name: "design_template" } },
          { field: { Name: "design_primaryColor" } },
          { field: { Name: "design_secondaryColor" } },
          { field: { Name: "design_logo" } },
          { field: { Name: "design_backgroundPattern" } },
          { field: { Name: "pointsConfig_pointsPerDollar" } },
          { field: { Name: "pointsConfig_bonusThreshold" } },
          { field: { Name: "pointsConfig_bonusPoints" } },
          { field: { Name: "rewards" } },
          { field: { Name: "status" } },
          { field: { Name: "createdDate" } },
          { field: { Name: "totalCustomers" } },
          { field: { Name: "totalPoints" } },
          { field: { Name: "redemptions" } }
        ]
      };

      const response = await this.apperClient.getRecordById('loyalty_card', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (!response.data) return null;

      // Transform flat database fields back to nested structure
      const card = response.data;
      return {
        ...card,
        name: card.Name,
        design: {
          template: card.design_template,
          primaryColor: card.design_primaryColor,
          secondaryColor: card.design_secondaryColor,
          logo: card.design_logo,
          backgroundPattern: card.design_backgroundPattern
        },
        pointsConfig: {
          pointsPerDollar: card.pointsConfig_pointsPerDollar,
          bonusThreshold: card.pointsConfig_bonusThreshold,
          bonusPoints: card.pointsConfig_bonusPoints
        }
      };
    } catch (error) {
      console.error("Error fetching loyalty card:", error);
      toast.error("Failed to load loyalty card");
      return null;
    }
  }

  async create(cardData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      // Flatten nested structure for database
      const updateableData = {
        Name: cardData.name || cardData.Name,
        businessName: cardData.businessName,
        description: cardData.description,
        design_template: cardData.design?.template,
        design_primaryColor: cardData.design?.primaryColor,
        design_secondaryColor: cardData.design?.secondaryColor,
        design_logo: cardData.design?.logo,
        design_backgroundPattern: cardData.design?.backgroundPattern,
        pointsConfig_pointsPerDollar: cardData.pointsConfig?.pointsPerDollar || 1,
        pointsConfig_bonusThreshold: cardData.pointsConfig?.bonusThreshold || 100,
        pointsConfig_bonusPoints: cardData.pointsConfig?.bonusPoints || 10,
        rewards: typeof cardData.rewards === 'string' ? cardData.rewards : JSON.stringify(cardData.rewards || []),
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0],
        totalCustomers: 0,
        totalPoints: 0,
        redemptions: 0
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.createRecord('loyalty_card', params);
      
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
          toast.success('Loyalty card created successfully');
          const createdCard = successfulRecords[0].data;
          // Transform back to nested structure for UI
          return {
            ...createdCard,
            name: createdCard.Name,
            design: {
              template: createdCard.design_template,
              primaryColor: createdCard.design_primaryColor,
              secondaryColor: createdCard.design_secondaryColor,
              logo: createdCard.design_logo,
              backgroundPattern: createdCard.design_backgroundPattern
            },
            pointsConfig: {
              pointsPerDollar: createdCard.pointsConfig_pointsPerDollar,
              bonusThreshold: createdCard.pointsConfig_bonusThreshold,
              bonusPoints: createdCard.pointsConfig_bonusPoints
            }
          };
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating loyalty card:", error);
      toast.error("Failed to create loyalty card");
      return null;
    }
  }

  async update(id, cardData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      // Flatten nested structure for database
      const updateableData = {
        Id: parseInt(id),
        Name: cardData.name || cardData.Name,
        businessName: cardData.businessName,
        description: cardData.description,
        design_template: cardData.design?.template,
        design_primaryColor: cardData.design?.primaryColor,
        design_secondaryColor: cardData.design?.secondaryColor,
        design_logo: cardData.design?.logo,
        design_backgroundPattern: cardData.design?.backgroundPattern,
        pointsConfig_pointsPerDollar: cardData.pointsConfig?.pointsPerDollar,
        pointsConfig_bonusThreshold: cardData.pointsConfig?.bonusThreshold,
        pointsConfig_bonusPoints: cardData.pointsConfig?.bonusPoints,
        rewards: typeof cardData.rewards === 'string' ? cardData.rewards : JSON.stringify(cardData.rewards || []),
        status: cardData.status,
        totalCustomers: cardData.totalCustomers,
        totalPoints: cardData.totalPoints,
        redemptions: cardData.redemptions
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.updateRecord('loyalty_card', params);
      
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
          toast.success('Loyalty card updated successfully');
          const updatedCard = successfulUpdates[0].data;
          // Transform back to nested structure for UI
          return {
            ...updatedCard,
            name: updatedCard.Name,
            design: {
              template: updatedCard.design_template,
              primaryColor: updatedCard.design_primaryColor,
              secondaryColor: updatedCard.design_secondaryColor,
              logo: updatedCard.design_logo,
              backgroundPattern: updatedCard.design_backgroundPattern
            },
            pointsConfig: {
              pointsPerDollar: updatedCard.pointsConfig_pointsPerDollar,
              bonusThreshold: updatedCard.pointsConfig_bonusThreshold,
              bonusPoints: updatedCard.pointsConfig_bonusPoints
            }
          };
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating loyalty card:", error);
      toast.error("Failed to update loyalty card");
      return null;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('loyalty_card', params);
      
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
          toast.success('Loyalty card deleted successfully');
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting loyalty card:", error);
      toast.error("Failed to delete loyalty card");
      return false;
    }
  }

  async getCardTemplates() {
    // Static template data - could be moved to database in future
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
}

export default new LoyaltyCardService();