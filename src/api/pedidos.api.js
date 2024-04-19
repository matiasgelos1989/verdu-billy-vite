import axios from 'axios';

const BASE_URL = 'https://nodetiendaverdu-production.up.railway.app';

export const getAllPedidos = (searchTerm) => {
    return axios.get(`${BASE_URL}/api/pedidos?name=${searchTerm || ''}`);
};

export const createPedido = (pedido) => {
    return axios.post(`${BASE_URL}/api/pedidos`, pedido);
};

export const updatePedido =  (id, pedido) => {
    return axios.put(`${BASE_URL}/api/pedidos/${id}`, pedido  )
};

export const removePedido = (id) => {
    return axios.delete(`${BASE_URL}/api/pedidos/${id}`);
}
