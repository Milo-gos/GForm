import React, { useState } from 'react';
import style from './responsesurvey.module.scss';
import classNames from 'classnames/bind';
import { FormControlLabel, IconButton, Menu, MenuItem, Switch } from '@mui/material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Question, Response } from '../../components';
import QuestionType from '../../utils/interfaces/questionType';
import ResponseSurveyInner from './ResponseSurveyInner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API from '../../utils/api';
import { useParams } from 'react-router-dom';
import ResponseInterface from '../../utils/interfaces/response';
import { useAppDispatch } from '../../redux';
import survey, { setSurvey } from '../../redux/slice/survey';
import { setLoading } from '../../redux/slice/global';
import PageError from '../PageError';
import { getResponseSurvey } from '../../utils/API/axios';
const cx = classNames.bind(style);

const ResponseSurveyPage = () => {
    const { id } = useParams();
    const dispatchApp = useAppDispatch();
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: [`getResponseSurvey_${id}`],
        queryFn: () => getResponseSurvey(id!),
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        dispatchApp(setLoading(true));
    }
    if (isError) {
        dispatchApp(setLoading(false));
        return <PageError />;
    }
    if (isSuccess) {
        dispatchApp(setLoading(false));
    }
    if (data) {
        dispatchApp(
            setSurvey({
                survey: data.survey,
            }),
        );
    }
    return (
        <div className={cx('wrapper')}>
            <ResponseSurveyInner data={data} />
        </div>
    );
};

export default ResponseSurveyPage;
