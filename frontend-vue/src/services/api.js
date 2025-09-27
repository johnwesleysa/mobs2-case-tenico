import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// Este "interceptor" é uma função que roda ANTES de cada requisição ser enviada.
api.interceptors.request.use(
  (config) => {
    // 1. Ele pega o token que foi salvo no localStorage.
    const token = localStorage.getItem('mobs2-token');

    // 2. Se o token existir, ele o adiciona ao cabeçalho 'Authorization'.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 3. Ele retorna a configuração da requisição, agora com o token.
    return config;
  },
  (error) => {
    // Se houver um erro ao configurar a requisição, ele é rejeitado.
    return Promise.reject(error);
  }
);

export default api;