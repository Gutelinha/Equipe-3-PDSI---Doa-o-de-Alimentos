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
    const response = await Api.get(`/products/${barcode}`);
    return response.data;
}

export const updateProduct = async (barcode, product) => {
    const response = await Api.put(`/products/${barcode}`, product);
    return response.data;
}

export const deleteProduct = async (barcode) => {
    const response = await Api.delete(`/products/${barcode}`);
    return response.data;
}

// Campanha

export const createCampaign = async (campaign) => {
    const response = await Api.post('/campaigns', campaign);
    return response.data;
};

export const getCampaign = async (name) => {
    const response = await Api.get(`/campaigns/${name}`);
    return response.data;
}

export const updateCampaign = async (name, campaign) => {
    const response = await Api.put(`/campaigns/${name}`, campaign);
    return response.data;
}

export const deleteCampaign = async (name) => {
    const response = await Api.delete(`/campaigns/${name}`);
    return response.data;
}

// Doação

export const createDonation = async (donation) => {
    const response = await Api.post('/donations', donation);
    return response.data;
}

export const findDonationByBarcode = async (productBarcode, campaignName) => {
    const response = await Api.get(`/donations/${productBarcode}/${campaignName}`);
    return response.data;
}

export const findDonationByCampaign = async (campaignName) => {
    const response = await Api.get(`/donations/${campaignName}`);
    return response.data;
}

export const findDonationByProduct = async (productBarcode) => {
    const response = await Api.get(`/donations/${productBarcode}`);
    return response.data;
}

export const updateDonationByBarcode = async (productBarcode, campaignName, donation) => {
    const response = await Api.put(`/donations/${productBarcode}/${campaignName}`, donation);
    return response.data;
}

export const deleteDonationByBarcode = async (productBarcode, campaignName) => {
    const response = await Api.delete(`/donations/${productBarcode}/${campaignName}`);
    return response.data;
}

export default Api;
