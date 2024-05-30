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

const cx = classNames.bind(style);

const AddNewSurveyQuestionPage = () => {
    const dispatchApp = useAppDispatch();
    const { id } = useParams();
    const {
        data: survey,
        isLoading,
        isError,
        isSuccess,
    } = useQuery({
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
    if (survey) {
        dispatchApp(
            setSurvey({
                survey,
            }),
        );
        dispatchApp(
            handleActiveQuestion({
                indexQuestion: 0,
            }),
        );
    }
    console.log('111');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('background')}>
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" />
                </div>
                <div
                    className={cx('container', 'active', 'form-header')}
                    onClick={() =>
                        dispatchApp(
                            handleActiveQuestion({
                                indexQuestion: -1,
                            }),
                        )
                    }>
                    <QuestionTextInput
                        value={survey?.title}
                        onChange={(e) => dispatchApp(handleChangeTitle({ title: e.target.value }))}
                        isTitleForm={true}></QuestionTextInput>
                    <QuestionTextInput
                        placeholder="Mô tả khảo sát"
                        value={survey?.description}
                        onChange={(e) =>
                            dispatchApp(handleChangeDescription({ description: e.target.value }))
                        }></QuestionTextInput>
                </div>
                {survey?.questions.length == 0 && (
                    <div className={cx('add')} onClick={handleAddFirstQuestion}>
                        <div className={cx('separate')}></div>
                        <IoIosAddCircleOutline className={cx('icon')} />
                        <div className={cx('separate')}></div>
                    </div>
                )}
                {survey?.questions.map((question, index) => <Question key={question.id} index={index} />)}
            </div>
        </div>
    );
};

export default AddNewSurveyQuestionPage;
