import axios from 'axios';

export const fetchData = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'apikey': process.env.REACT_APP_IDFM_API_KEY
            }
        });

        if (response.status !== 200) {
            throw new Error(`Error: Received status code ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Failed to fetch data from ${url}: ${error.message}`);
        return null;
    }
};