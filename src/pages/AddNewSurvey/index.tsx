import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux';
import { handleActiveQuestion, setSurvey } from '../../redux/slice/survey';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API from '../../utils/api';
import { useParams } from 'react-router-dom';
import SurveyInterface from '../../utils/interfaces/survey';
import AddNewSurveyQuestionInner from './AddNewSurveyInner';
import InstanceAxios from '../../utils/axios/instanceAxios';
import { setLoading } from '../../redux/slice/global';
import PageError from '../PageError';
import { getSurveyById } from '../../utils/API/axios';

const AddNewSurveyPage = () => {
    const dispatchApp = useAppDispatch();
    const { id } = useParams();
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: [`getSurveyById_${id}`],
        queryFn: () => getSurveyById(id!),
        refetchOnWindowFocus: false,
        retry: 0,
    });

    if (isLoading) {
        dispatchApp(setLoading(true));
    }
    if (isError) {
        dispatchApp(setLoading(false));
        window.location.href = '/';
    }
    if (isSuccess) {
        dispatchApp(setLoading(false));
    }
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

    if (isSuccess) return <AddNewSurveyQuestionInner />;
    return <></>;
};

export default AddNewSurveyPage;
