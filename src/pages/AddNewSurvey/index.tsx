import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux';
import { handleActiveQuestion, setSurvey } from '../../redux/slice/survey';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API from '../../utils/api';
import { useParams } from 'react-router-dom';
import SurveyInterface from '../../utils/interfaces/survey';
import AddNewSurveyQuestionInner from './AddNewSurveyInner';

const AddNewSurveyPage = () => {
    const dispatchApp = useAppDispatch();
    const { id } = useParams();
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: [`getSurveyById_${id}`],
        queryFn: async () => {
            const response = await axios.get(`${API.GetSurveyById.endPoint}/${id}`);
            const survey: SurveyInterface = response.data.data;
            return survey;
        },
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Đang tải survey ......................</div>;
    }
    if (isError) return <div>Lỗi ......................</div>;
    if (data) {
        dispatchApp(
            setSurvey({
                survey: data,
            }),
        );
        dispatchApp(
            handleActiveQuestion({
                indexQuestion: 0,
            }),
        );
    }

    return <AddNewSurveyQuestionInner />;
};

export default AddNewSurveyPage;
