import axios from 'axios';
import { ResponseInterface, SubmitFormInterface } from '../../utils/interfaces';
import InstanceAxios from '../../config/axios-interceptors';
const BE_URL = process.env.REACT_APP_BE_URL;

export const createResponse = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/response`, body);
    const newResponse: SubmitFormInterface = response.data;
    return newResponse;
};

export const getResponseSurvey = async (id: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/response/survey/${id}`);
    const t: ResponseInterface = response.data;
    return t;
};

export const getDataExcel = async (surveyId: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/response/data-export/${surveyId}`, {
        responseType: 'arraybuffer', // Ensure response type is arraybuffer
    });
    const data = response.data;
    return data;
};
