import React from 'react';
import style from './submitform.module.scss';
import classNames from 'classnames/bind';
import { Answer } from '../../components';
import QuestionType from '../../utils/interfaces/questionType';
import SubmitFormInner from './SubmitFormInner';
import { useAppDispatch } from '../../redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API from '../../utils/api';
import SurveyInterface from '../../utils/interfaces/survey';
import { setSurveySubmit } from '../../redux/slice/submitform';

const cx = classNames.bind(style);

const SubmitFormPage = () => {
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
            setSurveySubmit({
                survey: data,
            }),
        );
    }

    return <SubmitFormInner />;
};

export default SubmitFormPage;
