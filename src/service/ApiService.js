// services/apiService.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://66f23cbc415379191553727a.mockapi.io/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiClient3 = axios.create({
    baseURL: 'https://6529b2f755b137ddc83f18dc.mockapi.io/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});



// Obtener todos los usuarios (GET /User)
const getUsers = async () => {
    try {
        const response = await apiClient.get('/User');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
};

// Función de login (verifica email y contraseña)
const login = async (email, password) => {
    try {
        const users = await getUsers();
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            return user; // Login exitoso
        } else {
            throw new Error('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error en el login:', error);
        throw error;
    }
};
const getItems = async () => {
    try {
        const response = await apiClient.get('/New');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los artículos:', error);
        throw error;
    }
};
const getHarvestData = async () => {
    try {
        const response = await apiClient3.get('/HarvestData');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos de HarvestData:', error);
        throw error;
    }
};
const updateUser = async (id, updatedData) => {
    try {
        const response = await apiClient.put(`/User/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el perfil del usuario:', error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/User/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario por ID:', error);
        throw error;
    }
};

const createHarvest = async (newHarvest) => {
    try {
        const response = await apiClient3.post('/HarvestData', newHarvest);
        return response.data;
    } catch (error) {
        console.error('Error al crear la cosecha:', error);
        throw error;
    }
};
const registerUser = async (newUser) => {
    try {
        const response = await apiClient.post('/User', newUser);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw error;
    }
};

// Exportar las funciones
export default {
    getUsers,
    login,
    getItems,
    getHarvestData,
    getUserById,
    updateUser,
    createHarvest,
    registerUser, // Agregar aquí
};

