// api.ts
import axios from 'axios';
import { API_ENDPOINT, BEARER_TOKEN } from './config';

export const getCourses = async () => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_ENDPOINT}/courses`,
      headers: {
        Authorization: BEARER_TOKEN,
      },
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};
