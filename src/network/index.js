import axios from "axios";

export const auth = async (login, password) => {
    try {
        const response = await axios.post('https://acits-test-back.herokuapp.com/api/login', {
            login,
            password
        });

        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('user');
        }
    }
};

export const getAnimalAppointments = async (token) => {
    try {
        const response = await axios.get('https://acits-test-back.herokuapp.com/api/executions/today', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('user');
        }
    }
};

export const getLimitAnimals = async (token, limit, offset) => {
    try {
        const response = await axios.request({
            url: 'https://acits-test-back.herokuapp.com/api/animals',
            method: 'get',
            params: {
              offset,
              limit,
            },
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('user');
        }
    }
};

export const getAllAnimals = async (token) => {
    try {
        const response = await axios.request({
            url: 'https://acits-test-back.herokuapp.com/api/animals',
            method: 'get',
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('user');
        }
    }
};
