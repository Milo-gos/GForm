import axios from 'axios';
import {
    QuestionInterface,
    SharedSurveyData,
    SurveyData,
    SurveyInterface,
    UserInterface,
} from '../../utils/interfaces';
import InstanceAxios from '../../config/axios-interceptors';
const BE_URL = process.env.REACT_APP_BE_URL;

export const addQuestion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/question`, body);
    const question: QuestionInterface = response.data;
    return question;
};

export const duplicateQuestion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/question/duplicate`, body);
    const question: QuestionInterface = response.data;
    return question;
};

export const addFirstQuestion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/question/first`, body);
    const email: string = response.data;
    return email;
};

export const deleteQuestion = async (questionId: string) => {
    const response = await axios.delete(`${BE_URL}/api/question/${questionId}`);
    const question: QuestionInterface = response.data;
    return question;
};

export const changeQuestion = async (body: any) => {
    const response = await axios.put(`${BE_URL}/api/question`, body);
    const updateQuestion: QuestionInterface = response.data;
    return updateQuestion;
};

export const changeImageQuestion = async (body: any) => {
    const { questionId, formData } = body;
    const response = await InstanceAxios.put(`${BE_URL}/api/question/${questionId}/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const urlImage: string = response.data;
    return urlImage;
};

export const removeImageQuestion = async (body: any) => {
    const { questionId } = body;
    await InstanceAxios.delete(`${BE_URL}/api/question/${questionId}/image`);
};
