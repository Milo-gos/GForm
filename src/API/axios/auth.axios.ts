import axios from 'axios';
import { UserInterface } from '../../utils/interfaces';
import InstanceAxios from '../../utils/axios/instanceAxios';
const BE_URL = process.env.REACT_APP_BE_URL;

export const signUp = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/auth/sign-up`, body);
    const user: UserInterface = response.data;
    return user;
};

export const verifyEmail = async (verifyEmailToken: string) => {
    await axios.get(`${BE_URL}/api/auth/email-verification/${verifyEmailToken}`);
};

export const signIn = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/auth/sign-in`, body);
    const { accessToken, refreshToken } = response.data;
    return { accessToken, refreshToken };
};

export const signInGoogle = async (tokenFirebase: string) => {
    const response = await axios.post(`${BE_URL}/api/auth/sign-in/google`, { tokenFirebase });
    const { accessToken, refreshToken } = response.data;
    return { accessToken, refreshToken };
};

export const sendPasswordResetLink = async (email: string) => {
    await axios.get(`${BE_URL}/api/auth/password-reset-link/${email}`);
};

export const verifyLinkResetPassword = async (resetPasswordToken: string) => {
    const response = await axios.get(`${BE_URL}/api/auth/verify-link-reset-password/${resetPasswordToken}`);
    const email: string = response.data;
    return email;
};
export const resetPassword = async (body: { email: string; password: string }) => {
    await axios.post(`${BE_URL}/api/auth/reset-password/${body.email}`, {
        password: body.password,
    });
};

export const changeUserPassword = async (body: any) => {
    const response = await InstanceAxios.patch(`${BE_URL}/api/auth/changeUserPassword`, body);
    const { accessToken, refreshToken } = response.data.data;
    return { accessToken, refreshToken };
};

export const setUserPassword = async (body: any) => {
    const response = await InstanceAxios.patch(`${BE_URL}/api/auth/password`, body);
    const { accessToken, refreshToken } = response.data.data;
    return { accessToken, refreshToken };
};
