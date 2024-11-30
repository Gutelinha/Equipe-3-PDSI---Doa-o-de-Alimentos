import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:8080',
})

// Produto

export const createProduct = async (product) => {
    const response = await Api.post('/products', product);
    return response.data;
};

export const getProduct = async (barcode) => {
    try {
        const response = await Api.get(`/products/${barcode}`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar produto:', error);
    }
}

export const updateProduct = async (barcode, product) => {
    try {
        const response = await Api.put(`/products/${barcode}`, product);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao atualizar produto:', error);
        alert('Erro ao atualizar produto. Tente novamente mais tarde.');
    }
}

export const deleteProduct = async (barcode) => {
    try {
        const response = await Api.delete(`/products/${barcode}`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao deletar produto:', error);
        alert('Erro ao deletar produto. Tente novamente mais tarde.');
    }
}

// Campanha

export const createCampaign = async (campaign) => {
    try {
        const response = await Api.post('/campaigns', campaign);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao cadastrar campanha:', error);
        alert('Erro ao cadastrar campanha. Tente novamente mais tarde.');
    }
};

export const getCampaign = async (name) => {
    try {
        const response = await Api.get(`/campaigns/${name}`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar campanha:', error);
        alert('Erro ao buscar campanha. Tente novamente mais tarde.');
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

// Doação

export const createDonation = async (donation) => {
    try {
        const response = await Api.post('/donations', donation);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao cadastrar doação:', error);
        alert('Erro ao cadastrar doação. Tente novamente mais tarde.');
    }
}

export const findDonationByBarcode = async (productBarcode, campaignName) => {
    try {
        const response = await Api.get(`/donations/${productBarcode}/${campaignName}`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar doação:', error);
        alert('Erro ao buscar doação. Tente novamente mais tarde.');
    }
}

export const findDonationByCampaign = async (campaignName) => {
    try {
        const response = await Api.get(`/donations/${campaignName}`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar doações:', error);
        alert('Erro ao buscar doações. Tente novamente mais tarde.');
    }
}

export const findDonationByProduct = async (productBarcode) => {
    try {
        const response = await Api.get(`/donations/${productBarcode}`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar doações:', error);
        alert('Erro ao buscar doações. Tente novamente mais tarde.');
    }
}

export const updateDonationByBarcode = async (productBarcode, campaignName, donation) => {
    try {
        const response = await Api.put(`/donations/${productBarcode}/${campaignName}`, donation);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao atualizar doação:', error);
        alert('Erro ao atualizar doação. Tente novamente mais tarde.');
    }
}

export const deleteDonationByBarcode = async (productBarcode, campaignName) => {
    try {
        const response = await Api.delete(`/donations/${productBarcode}/${campaignName}`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao deletar doação:', error);
        alert('Erro ao deletar doação. Tente novamente mais tarde.');
    }
}

export default Api;
