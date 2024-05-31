import React, { useEffect, useState } from 'react';
import style from './addnewsurveyquestion.module.scss';
import classNames from 'classnames/bind';
import { Question, QuestionTextInput } from '../../components';
import QuestionType from '../../utils/interfaces/questionType';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
    handleActiveQuestion,
    handleChangeDescription,
    handleChangeTitle,
    handleInsertQuestion,
    setNewSurvey,
    setSurvey,
} from '../../redux/slice/survey';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API from '../../utils/api';
import { useParams } from 'react-router-dom';
import SurveyInterface from '../../utils/interfaces/survey';
import AddNewSurveyQuestionInner from './AddNewSurveyInner';

const cx = classNames.bind(style);

const AddNewSurveyQuestionPage = () => {
    const dispatchApp = useAppDispatch();
    const { id } = useParams();

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: [`getSurveyById_${id}`],
        queryFn: async () => {
            const response = await axios.get(`${API.GetSurveyById.endPoint}/${id}`);
            const survey: SurveyInterface = response.data.data;
            return survey;
        },
    });
    // useEffect(() => {
    //     dispatchApp(setNewSurvey());
    // }, []);

    const handleAddFirstQuestion = () => {
        console.log('111');
        // dispatchApp(
        //     handleInsertQuestion({
        //         position: 0,
        //     }),
        // );
    };
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

export default AddNewSurveyQuestionPage;
