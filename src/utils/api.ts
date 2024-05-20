const BE_URL = process.env.REACT_APP_BE_URL;

const API = {
    RegisterUser: {
        endPoint: `${BE_URL}/auth/register`,
        method: 'post',
    },

    VerifyEmail: {
        endPoint: `${BE_URL}/auth/verifyEmail/:token-link`,
        method: 'get',
    },
};

export default API;
