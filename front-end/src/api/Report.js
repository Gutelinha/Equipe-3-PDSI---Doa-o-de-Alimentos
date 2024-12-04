import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getCampaignReport = async (name = {}) => {
    try {
        const endpoint =  `/reports/${name}` 
            
        const response = await Api.get(endpoint);
        return response.data;
    }
    catch (error) {
        return null;
    }
}