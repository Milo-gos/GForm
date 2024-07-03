import axios from 'axios';
import { SharedSurveyData } from '../../utils/interfaces';
import InstanceAxios from '../../utils/axios/instanceAxios';
const BE_URL = process.env.REACT_APP_BE_URL;

export const getSharedSurveysOfCurrentUser = async ({
    pageParam,
    queryKey,
}: {
    pageParam: number;
    queryKey: string[];
}) => {
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

export const changeEditSharedUser = async (body: any) => {
    const { sharedId, isEdit, surveyId } = body;
    const response = await InstanceAxios.patch(`${BE_URL}/api/survey-share/${sharedId}/changeEditSharedUser`, {
        isEdit,
        surveyId,
    });
    const data: { shareId: string; isEdit: boolean } = response.data.data;
    return data;
};

export const deleteSharedUser = async (body: any) => {
    const { sharedId, surveyId } = body;
    await InstanceAxios.delete(`${BE_URL}/api/survey-share/survey/${surveyId}/deleteSharedSurvey/${sharedId}`);
};

export const shareWithEmail = async (body: any) => {
    const response = await InstanceAxios.post(`${BE_URL}/api/survey-share/shareWithEmail`, body);
    return response.data.data;
};
