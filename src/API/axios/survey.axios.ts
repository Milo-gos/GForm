import axios from 'axios';
import {
    SharedSurveyData,
    SharedUserInterface,
    SurveyData,
    SurveyInterface,
    UserInterface,
} from '../../utils/interfaces';
import InstanceAxios from '../../config/axios-interceptors';
const BE_URL = process.env.REACT_APP_BE_URL;

export const createSurvey = async () => {
    const response = await InstanceAxios.post(`${BE_URL}/api/survey`);
    const newSurvey: SurveyInterface = response.data;
    return newSurvey;
};

export const getSurveyById = async (surveyId: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/survey/${surveyId}`);
    const survey: SurveyInterface = response.data;
    return survey;
};

export const getPublicSurveyById = async (surveyId: string) => {
    const response = await axios.get(`${BE_URL}/api/survey/${surveyId}/public`);
    const survey: SurveyInterface = response.data;
    return survey;
};

export const getSurveysOfCurrentUser = async ({ pageParam, queryKey }: { pageParam: number; queryKey: string[] }) => {
    const [, searchString, value] = queryKey;
    const searchParams = new URLSearchParams();
    searchParams.append('page', pageParam.toString());
    searchParams.append('status', value);
    searchParams.append('searchString', searchString);
    const response = await InstanceAxios.get(`${BE_URL}/api/survey/all/current-user/?${searchParams.toString()}`);
    const { surveys, nextCursor, totalSurveys }: { surveys: SurveyData[]; nextCursor: number; totalSurveys: number } =
        response.data;
    return { surveys, nextCursor, totalSurveys };
};

export const changeSurvey = async (body: any) => {
    const response = await InstanceAxios.put(`${BE_URL}/api/survey`, body);
    const updateQuestion: SurveyInterface = response.data;
    return updateQuestion;
};

export const getSharedUserSurvey = async (id: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/survey/${id}/shared-user`);
    const t: SharedUserInterface = response.data;
    return t;
};

export const changeBackgroundSurvey = async (body: any) => {
    const { surveyId, formData } = body;
    const response = await InstanceAxios.put(`${BE_URL}/api/survey/${surveyId}/background`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const urlImage: string = response.data;
    return urlImage;
};

export const deleteSurvey = async (surveyId: string) => {
    await InstanceAxios.delete(`${BE_URL}/api/survey/${surveyId}`);
};
