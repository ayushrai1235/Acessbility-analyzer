import axios from 'axios';

export const analyzeAccessibility = async (url) => {
  try {
    const response = await axios.post('http://localhost:5000/api/analyze', { url });
    return response;
  } catch (error) {
    console.error('Error in API call:', error);
    throw error;
  }
};
