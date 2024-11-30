import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createCampaign = async (campaign) => {
    try {
        const jsonData = JSON.stringify(campaign);
        const response = await Api.post('/campaigns', jsonData);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao cadastrar campanha:', error);
        alert('Erro ao cadastrar campanha. Tente novamente mais tarde.');
        return null;
    }
};

export const getCampaign = async (name) => {
    try {
        const endpoint = name ? `/campaigns/${name}` : '/campaigns?active=true';
        const response = await Api.get(endpoint);
        return response.data;
    }
    catch (error) {
        return null;
    }
}


export const updateCampaign = async (name, campaign) => {
    try {
        const response = await Api.put(`/campaigns/${name}`, campaign);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao atualizar campanha:', error);
        alert('Erro ao atualizar campanha. Tente novamente mais tarde.');
    }
}

export const deleteCampaign = async (name) => {
    try {
        const response = await Api.delete(`/campaigns/${name}`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao deletar campanha:', error);
        alert('Erro ao deletar campanha. Tente novamente mais tarde.');
    }    
}