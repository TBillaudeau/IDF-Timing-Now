import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

const fetchData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/data`);
        return response.data;
    } catch (error) {
        // Error handling
        console.error(error);
    }
};

export const apiService = {
    fetchData,
};
