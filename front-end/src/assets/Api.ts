import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export interface Product {
    barcode: string;
    name: string;
    brand: string;
    type: string;
    volumeUnit: string;
}

export interface Campaign {
    name: string;
    startDate: Date;
}

export interface Donation {
    productBarcode: string;
    campaignName: string;
    quantity: number;
}

// Produto

export const createProduct = async (product: Product) => {
    const response = await api.post('/products', product);
    return response.data;
};

export const getProduct = async (barcode: string) => {
    const response = await api.get(`/products/${barcode}`);
    return response.data;
}

export const updateProduct = async (barcode: string, product: Product) => {
    const response = await api.put(`/products/${barcode}`, product);
    return response.data;
}

export const deleteProduct = async (barcode: string) => {
    const response = await api.delete(`/products/${barcode}`);
    return response.data;
}

// Campanha

export const createCampaign = async (campaign: Campaign) => {
    const response = await api.post('/campaigns', campaign);
    return response.data;
};

export const getCampaign = async (name: string) => {
    const response = await api.get(`/campaigns/${name}`);
    return response.data;
}

export const updateCampaign = async (name: string, campaign: Campaign) => {
    const response = await api.put(`/campaigns/${name}`, campaign);
    return response.data;
}

export const deleteCampaign = async (name: string) => {
    const response = await api.delete(`/campaigns/${name}`);
    return response.data;
}

// Doação

export const createDonation = async (donation: Donation) => {
    const response = await api.post('/donations', donation);
    return response.data;
}

export const findDonationByBarcode = async (productBarcode: string, campaignName: string) => {
    const response = await api.get(`/donations/${productBarcode}/${campaignName}`);
    return response.data;
}

export const findDonationByCampaign = async (campaignName: string) => {
    const response = await api.get(`/donations/${campaignName}`);
    return response.data;
}

export const findDonationByProduct = async (productBarcode: string) => {
    const response = await api.get(`/donations/${productBarcode}`);
    return response.data;
}

export const updateDonationByBarcode = async (productBarcode: string, campaignName: string, donation: Donation) => {
    const response = await api.put(`/donations/${productBarcode}/${campaignName}`, donation);
    return response.data;
}

export const deleteDonationByBarcode = async (productBarcode: string, campaignName: string) => {
    const response = await api.delete(`/donations/${productBarcode}/${campaignName}`);
    return response.data;
}

export default api;
