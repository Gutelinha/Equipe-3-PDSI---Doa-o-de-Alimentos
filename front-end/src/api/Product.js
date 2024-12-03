import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:8080',
})

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