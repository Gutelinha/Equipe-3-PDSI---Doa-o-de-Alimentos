import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:8080',
})

// Produto

export const createProduct = async (product) => {
    try {
        const response = await Api.post('/products', product);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        alert('Erro ao cadastrar produto. Tente novamente mais tarde.');
    }
};

export const getProduct = async (barcode) => {
    try {
        const response = await Api.get(`/products/${barcode}`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar produto:', error);
        alert('Erro ao buscar produto. Tente novamente mais tarde.');
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
