import api from './Axios';

export const homeApi = {
  // Get all sections
  getAllSections: async () => {
    const response = await api.get('/admin/home/sections');
    return response.data;
  },
  
  // Get single section
  getSection: async (sectionId) => {
    const response = await api.get(`/admin/home/sections/${sectionId}`);
    return response.data;
  },
  
  // Update section
  updateSection: async (sectionId, settings) => {
    const response = await api.put(`/admin/home/sections/${sectionId}`, settings);
    return response.data;
  }
};