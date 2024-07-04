import axios from 'axios';
import { UserInterface } from '../../utils/interfaces';
import InstanceAxios from '../../config/axios-interceptors';
const BE_URL = process.env.REACT_APP_BE_URL;

export const changeUserAvatar = async (body: any) => {
    const response = await InstanceAxios.put(`${BE_URL}/api/user/avatar`, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const urlImage: string = response.data;
    return urlImage;
};

export const changeUsername = async (body: any) => {
    await InstanceAxios.put(`${BE_URL}/api/user/name`, body);
};

export const getCurrentUser = async () => {
    const response = await InstanceAxios.get(`${BE_URL}/api/user/current-user`);
    const user: UserInterface = response.data;
    return user;
};
