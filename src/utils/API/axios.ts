import axios from 'axios';
import InstanceAxios from '../axios/instanceAxios';
import UserInterface from '../interfaces/user';
import SurveyInterface from '../interfaces/survey';
import SurveyData from '../interfaces/surveyData';
import QuestionInterface from '../interfaces/question';
import OptionInterface from '../interfaces/option';
import RowInterface from '../interfaces/row';
import GColumnInterface from '../interfaces/gcolumn';
import SubmitFormInterface from '../interfaces/submitForm';
import ResponseInterface from '../interfaces/response';
import SharedSurveyData from '../interfaces/sharedSurveyData';
import SharedUserInterface from '../interfaces/sharedUserInterface';

const BE_URL = process.env.REACT_APP_BE_URL;

const getCurrentUser = async () => {
    const response = await InstanceAxios.get(`${BE_URL}/api/user/getCurrentUser`);
    const user: UserInterface = response.data.data;
    return user;
};

const signUp = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/auth/signUp`, body);
    const user: UserInterface = response.data.data;
    return user;
};

const verifyEmail = async (tokenLink: string) => {
    await axios.get(`${BE_URL}/api/auth/verifyEmail/${tokenLink}`);
};

const signIn = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/auth/signIn`, body);
    const { accessToken, refreshToken } = response.data.data;
    return { accessToken, refreshToken };
};

const checkExistEmail = async (email: string) => {
    await axios.get(`${BE_URL}/api/auth/checkExistEmail/${email}`);
};

const verifyLinkResetPassword = async (tokenLinkResetPassword: string) => {
    const response = await axios.get(`${BE_URL}/api/auth/VerifyLinkResetPassword/${tokenLinkResetPassword}`);
    const email: string = response.data.data;
    return email;
};
const resetPassword = async (body: any) => {
    await axios.post(`${BE_URL}/api/auth/resetPassword`, body);
};

const createSurvey = async () => {
    const response = await InstanceAxios.post(`${BE_URL}/api/survey/createSurvey`);
    const newSurvey: SurveyInterface = response.data.data;
    return newSurvey;
};
const getSurveyById = async (surveyId: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/survey/getSurveyById/${surveyId}`);
    const survey: SurveyInterface = response.data.data;
    return survey;
};

const getSurveysOfCurrentUser = async ({ pageParam, queryKey }: { pageParam: number; queryKey: string[] }) => {
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

const getSharedSurveysOfCurrentUser = async ({ pageParam, queryKey }: { pageParam: number; queryKey: string[] }) => {
    const [, searchString, value] = queryKey;
    const searchParams = new URLSearchParams();
    searchParams.append('page', pageParam.toString());
    searchParams.append('status', value);
    searchParams.append('searchString', searchString);
    const response = await InstanceAxios.get(
        `${BE_URL}/api/survey-share/getSharedSurveysOfCurrentUser/?${searchParams.toString()}`,
    );
    const { sharedSurveys, nextCursor }: { sharedSurveys: SharedSurveyData[]; nextCursor: number } = response.data.data;
    return { sharedSurveys, nextCursor };
};

const changeQuestion = async (body: any) => {
    const response = await axios.patch(`${BE_URL}/api/question/changeQuestion`, body);
    const updateQuestion: QuestionInterface = response.data.data;
    return updateQuestion;
};

const changeOption = async (body: any) => {
    const response = await axios.patch(`${BE_URL}/api/option/changeOption`, body);
    const updateOption: QuestionInterface = response.data.data;
    return updateOption;
};

const addOPtion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/option/addOption`, body);
    const option: OptionInterface = response.data.data;
    return option;
};

const addRow = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/row/addRow`, body);
    const row: RowInterface = response.data.data;
    return row;
};

const addGColumn = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/gcolumn/addGColumn`, body);
    const gcolumn: GColumnInterface = response.data.data;
    return gcolumn;
};

const addQuestion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/question/addQuestion`, body);
    const question: QuestionInterface = response.data.data;
    return question;
};

const duplicateQuestion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/question/duplicateQuestion`, body);
    const question: QuestionInterface = response.data.data;
    return question;
};

const addFirstQuestion = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/question/addFirstQuestion`, body);
    const email: string = response.data.data;
    return email;
};

const deleteQuestion = async (questionId: string) => {
    const response = await axios.delete(`${BE_URL}/api/question/deleteQuestion/${questionId}`);
    const question: QuestionInterface = response.data.data;
    return question;
};

const deleteOption = async (optionId: string) => {
    const response = await axios.delete(`${BE_URL}/api/option/deleteOption/${optionId}`);
    const option: OptionInterface = response.data.data;
    return option;
};

const deleteRow = async (rowId: string) => {
    const response = await axios.delete(`${BE_URL}/api/row/deleteRow/${rowId}`);
    const row: RowInterface = response.data.data;
    return row;
};

const deleteGColumn = async (gcolumnId: string) => {
    const response = await axios.delete(`${BE_URL}/api/gcolumn/deleteGColumn/${gcolumnId}`);
    const gcolumn: GColumnInterface = response.data.data;
    return gcolumn;
};

const changeLinearScale = async (body: any) => {
    const response = await axios.patch(`${BE_URL}/api/linearScale/changeLinearScale`, body);
    const updateOption: QuestionInterface = response.data.data;
    return updateOption;
};

const changeRow = async (body: any) => {
    const response = await axios.patch(`${BE_URL}/api/row/changeRow`, body);
    const updateRow: RowInterface = response.data.data;
    return updateRow;
};

const changeGColumn = async (body: any) => {
    const response = await axios.patch(`${BE_URL}/api/gcolumn/changeGColumn`, body);
    const updateGColumn: RowInterface = response.data.data;
    return updateGColumn;
};

const changeSurvey = async (body: any) => {
    const response = await InstanceAxios.patch(`${BE_URL}/api/survey/changeSurvey`, body);
    const updateQuestion: SurveyInterface = response.data.data;
    return updateQuestion;
};

const createResponse = async (body: any) => {
    const response = await axios.post(`${BE_URL}/api/response/createResponse`, body);
    const newResponse: SubmitFormInterface = response.data.data;
    return newResponse;
};

const getResponseSurvey = async (id: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/response/getResponseSurvey/${id}`);
    const t: ResponseInterface = response.data.data;
    return t;
};

const getSharedUserSurvey = async (id: string) => {
    const response = await InstanceAxios.get(`${BE_URL}/api/survey/getSharedUserSurvey/${id}`);
    const t: SharedUserInterface = response.data.data;
    return t;
};

const shareWithEmail = async (body: any) => {
    const response = await InstanceAxios.post(`${BE_URL}/api/survey-share/shareWithEmail`, body);
    return response.data.data;
};

const changeUserAvatar = async (body: any) => {
    const response = await InstanceAxios.patch(`${BE_URL}/api/user/changeUserAvatar`, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const urlImage: string = response.data.data;
    return urlImage;
};

const changeBackgroundSurvey = async (body: any) => {
    const { surveyId, formData } = body;
    const response = await InstanceAxios.patch(`${BE_URL}/api/survey/${surveyId}/changeBackgroundSurvey`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const urlImage: string = response.data.data;
    return urlImage;
};

const changeImageQuestion = async (body: any) => {
    const { questionId, formData } = body;
    const response = await InstanceAxios.patch(`${BE_URL}/api/question/${questionId}/changeImageQuestion`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const urlImage: string = response.data.data;
    return urlImage;
};

const removeImageQuestion = async (body: any) => {
    const { questionId } = body;
    await InstanceAxios.patch(`${BE_URL}/api/question/${questionId}/removeImageQuestion`);
};

const changeUsername = async (body: any) => {
    await InstanceAxios.patch(`${BE_URL}/api/user/changeUsername`, body);
};

const changeUserPassword = async (body: any) => {
    const response = await InstanceAxios.patch(`${BE_URL}/api/auth/changeUserPassword`, body);
    const { accessToken, refreshToken } = response.data.data;
    return { accessToken, refreshToken };
};

const changeEditSharedUser = async (body: any) => {
    const { sharedId, isEdit, surveyId } = body;
    const response = await InstanceAxios.patch(`${BE_URL}/api/survey-share/${sharedId}/changeEditSharedUser`, {
        isEdit,
        surveyId,
    });
    const data: { shareId: string; isEdit: boolean } = response.data.data;
    return data;
};

const deleteSharedUser = async (body: any) => {
    const { sharedId, surveyId } = body;
    await InstanceAxios.delete(`${BE_URL}/api/survey-share/survey/${surveyId}/deleteSharedSurvey/${sharedId}`);
};

export {
    getCurrentUser,
    signUp,
    verifyEmail,
    signIn,
    checkExistEmail,
    verifyLinkResetPassword,
    resetPassword,
    createSurvey,
    getSurveyById,
    getSurveysOfCurrentUser,
    getSharedSurveysOfCurrentUser,
    changeQuestion,
    changeImageQuestion,
    removeImageQuestion,
    changeOption,
    addOPtion,
    addRow,
    addGColumn,
    addQuestion,
    duplicateQuestion,
    addFirstQuestion,
    deleteQuestion,
    deleteOption,
    deleteRow,
    deleteGColumn,
    changeLinearScale,
    changeRow,
    changeGColumn,
    changeSurvey,
    changeBackgroundSurvey,
    createResponse,
    getResponseSurvey,
    shareWithEmail,
    changeUserAvatar,
    changeUsername,
    changeUserPassword,
    getSharedUserSurvey,
    changeEditSharedUser,
    deleteSharedUser,
};
