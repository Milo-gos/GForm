import axios from 'axios';
import {
    QuestionInterface,
    SharedSurveyData,
    SurveyData,
    SurveyInterface,
    UserInterface,
} from '../../utils/interfaces';
import InstanceAxios from '../../utils/axios/instanceAxios';
const BE_URL = process.env.REACT_APP_BE_URL;

export const addQuestion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/question/addQuestion`, body);
    const question: QuestionInterface = response.data.data;
    return question;
};

export const duplicateQuestion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/question/duplicateQuestion`, body);
    const question: QuestionInterface = response.data.data;
    return question;
};

export const addFirstQuestion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/question/addFirstQuestion`, body);
    const email: string = response.data.data;
    return email;
};

export const deleteQuestion = async (questionId: string) => {
    const response = await axios.delete(`${BE_URL}/api/question/deleteQuestion/${questionId}`);
    const question: QuestionInterface = response.data.data;
    return question;
};

export const changeQuestion = async (body: any) => {
    const response = await axios.patch(`${BE_URL}/api/question/changeQuestion`, body);
    const updateQuestion: QuestionInterface = response.data.data;
    return updateQuestion;
};

export const changeImageQuestion = async (body: any) => {
    const { questionId, formData } = body;
    const response = await InstanceAxios.patch(`${BE_URL}/api/question/${questionId}/changeImageQuestion`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const urlImage: string = response.data.data;
    return urlImage;
};

export const removeImageQuestion = async (body: any) => {
    const { questionId } = body;
    await InstanceAxios.patch(`${BE_URL}/api/question/${questionId}/removeImageQuestion`);
};
