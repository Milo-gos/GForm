import axios from 'axios';
import {
    SharedSurveyData,
    SharedUserInterface,
    SurveyData,
    SurveyInterface,
    UserInterface,
} from '../../utils/interfaces';
import InstanceAxios from '../../utils/axios/instanceAxios';
const BE_URL = process.env.REACT_APP_BE_URL;

export const createSurvey = async () => {
    const response = await InstanceAxios.post(`${BE_URL}/api/survey/createSurvey`);
    const newSurvey: SurveyInterface = response.data.data;
    return newSurvey;
};

export const getSurveyById = async (surveyId: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/survey/getSurveyById/${surveyId}`);
    const survey: SurveyInterface = response.data.data;
    return survey;
};

export const getPublicSurveyById = async (surveyId: string) => {
    const response = await axios.get(`${BE_URL}/api/survey/getPublicSurveyById/${surveyId}`);
    const survey: SurveyInterface = response.data.data;
    return survey;
};

export const getSurveysOfCurrentUser = async ({ pageParam, queryKey }: { pageParam: number; queryKey: string[] }) => {
    const [, searchString, value] = queryKey;
    const searchParams = new URLSearchParams();
    searchParams.append('page', pageParam.toString());
    searchParams.append('status', value);
    searchParams.append('searchString', searchString);
    const response = await InstanceAxios.get(
        `${BE_URL}/api/survey/getSurveysOfCurrentUser/?${searchParams.toString()}`,
    );
    const { surveys, nextCursor, totalSurveys }: { surveys: SurveyData[]; nextCursor: number; totalSurveys: number } =
        response.data.data;
    return { surveys, nextCursor, totalSurveys };
};

export const changeSurvey = async (body: any) => {
    const response = await InstanceAxios.patch(`${BE_URL}/api/survey/changeSurvey`, body);
    const updateQuestion: SurveyInterface = response.data.data;
    return updateQuestion;
};

export const getSharedUserSurvey = async (id: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/survey/getSharedUserSurvey/${id}`);
    const t: SharedUserInterface = response.data.data;
    return t;
};

export const changeBackgroundSurvey = async (body: any) => {
    const { surveyId, formData } = body;
    const response = await InstanceAxios.patch(`${BE_URL}/api/survey/${surveyId}/changeBackgroundSurvey`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const urlImage: string = response.data.data;
    return urlImage;
};

export const deleteSurvey = async (surveyId: string) => {
    await InstanceAxios.delete(`${BE_URL}/api/survey/${surveyId}`);
};
