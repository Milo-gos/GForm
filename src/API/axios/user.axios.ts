import axios from 'axios';
import { UserInterface } from '../../utils/interfaces';
import InstanceAxios from '../../utils/axios/instanceAxios';
const BE_URL = process.env.REACT_APP_BE_URL;

export const changeUserAvatar = async (body: any) => {
    const response = await InstanceAxios.patch(`${BE_URL}/api/user/changeUserAvatar`, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const urlImage: string = response.data.data;
    return urlImage;
};

export const changeUsername = async (body: any) => {
    await InstanceAxios.patch(`${BE_URL}/api/user/changeUsername`, body);
};

export const getCurrentUser = async () => {
    const response = await InstanceAxios.get(`${BE_URL}/api/user/current-user`);
    const user: UserInterface = response.data;
    return user;
};
