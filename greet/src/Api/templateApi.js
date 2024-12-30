import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

// Fetch all templates
export const fetchTemplates = async (page, limit) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getTemplates`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

export const saveTemplate = async (id, content) => {
  try {
    const response = await axios.patch(`http://localhost:4000/api/updateTemplate/${id}`, { content });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const fetchTemplateById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getTemplate/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching template with id ${id}:`, error);
    throw error;
  }
};

// Create a new template
export const createTemplate = async (templateData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addTemplate`, templateData);
    return response.data;
  } catch (error) {
    console.error('Error creating template:', error);
    throw error;
  }
};

//Get recipients lsit

