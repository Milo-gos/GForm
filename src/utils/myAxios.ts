import axios from 'axios';
const BE_URL = process.env.REACT_APP_BE_URL;
const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

const instance = axios.create({ headers });

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken') || false;

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        if (error.response?.status === 401) {
            try {
                const resust = await axios.post(
                    `${process.env.BE_URL}/user/refreshToken`,
                    {
                        refreshToken: localStorage.getItem('refreshToken'),
                    },
                );
                const { accessToken, refreshToken } = resust.data.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                originalConfig.headers['Authorization'] =
                    `Bearer ${accessToken}`;
                return instance(originalConfig);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/signin';
                }
                return Promise.reject(error);
            }
        } else return Promise.reject(error);
    },
);
export default instance;
