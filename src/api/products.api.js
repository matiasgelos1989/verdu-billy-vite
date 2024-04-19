import axios from 'axios';

const BASE_URL = 'https://nodetiendaverdu-production.up.railway.app';

export const getAllProducts = (searchTerm) => {
    return axios.get(`${BASE_URL}/api/products?name=${searchTerm || ''}`);
};

export const createProduct = (product) => {
    return axios.post(`${BASE_URL}/api/products`, product);
};

export const updateProduct =  (id, product) => {
         return axios.put(`${BASE_URL}/api/products/${id}`, product  )
};

export const removeProduct = (id) => {
    return axios.delete(`${BASE_URL}/api/products/${id}`)
}

//login
export const login = (loginData) => {
    return axios.post(`${BASE_URL}/auth/login`, loginData);
};

export const register = (user) => {
    return axios.post(`${BASE_URL}/auth/register`, user);
}

