import axios from 'axios';
import { ResponseInterface, SubmitFormInterface, UserInterface } from '../../utils/interfaces';
import InstanceAxios from '../../utils/axios/instanceAxios';
const BE_URL = process.env.REACT_APP_BE_URL;

export const createResponse = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/response/createResponse`, body);
    const newResponse: SubmitFormInterface = response.data.data;
    return newResponse;
};

export const getResponseSurvey = async (id: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/response/getResponseSurvey/${id}`);
    const t: ResponseInterface = response.data.data;
    return t;
};

export const getDataExcel = async (surveyId: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/response/dataExportResponse/${surveyId}`, {
        responseType: 'arraybuffer', // Ensure response type is arraybuffer
    });
    const data = response.data;
    return data;
};
