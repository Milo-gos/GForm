import React, { useEffect, useState } from 'react';
import style from './editsurvey.module.scss';
import classNames from 'classnames/bind';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import {
    handleActiveQuestion,
    handleChangeDescription,
    handleChangeTitle,
    handleInsertQuestion,
    handleSetNewQuestion,
    setSurvey,
} from '../../../../redux/slice/survey';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import useAutoSave from '../../../../hooks/useAutoSave';
import useChangeSurveyMutation from '../../mutation/changeSurvey';
import { setLoading } from '../../../../redux/slice/global';
import { useQuery } from '@tanstack/react-query';
import { getSurveyById } from '../../../../utils/API/axios';
import useAddFirstQuestionMutation from './components/Question/mutation/addFirstQuestion';
import QuestionTextInput from './components/QuestionTextInput';
import Question from './components/Question';

const cx = classNames.bind(style);

const EditSurveyPage = () => {
    const dispatchApp = useAppDispatch();
    const { id } = useParams();
    const survey = useAppSelector((state) => state.survey);

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: [`getSurveyById_${id}`],
        queryFn: () => getSurveyById(id!),
        refetchOnWindowFocus: false,
        retry: 0,
    });

    useEffect(() => {
        if (isLoading) {
            dispatchApp(setLoading(true));
        }
        if (isSuccess || isError) {
            dispatchApp(setLoading(false));
        }
    }, [isLoading, isError, isSuccess, dispatchApp]);
    useEffect(() => {
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
    }, [dispatchApp, data]);

    const ChangeSurveyMutation = useChangeSurveyMutation();
    useAutoSave(survey.title, () => {
        ChangeSurveyMutation.mutate(
            {
                id: survey.id,
                title: survey.title,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    });
    useAutoSave(survey.description, () => {
        ChangeSurveyMutation.mutate(
            {
                id: survey.id,
                description: survey.description,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    });

    const AddFirstQuestionMutation = useAddFirstQuestionMutation();
    const handleAddFirstQuestion = () => {
        dispatchApp(
            handleInsertQuestion({
                position: 0,
            }),
        );
        AddFirstQuestionMutation.mutate(
            {
                surveyId: id,
            },
            {
                onSuccess(data, variables, context) {
                    dispatchApp(
                        handleSetNewQuestion({
                            indexQuestion: 0,
                            newQuestion: data,
                        }),
                    );
                },
            },
        );
    };

    if (!data) return <></>;
    console.log(survey.isAccepting);

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
                        value={survey.title}
                        onChange={(e) => dispatchApp(handleChangeTitle({ title: e.target.value }))}
                        isTitleForm={true}></QuestionTextInput>
                    <QuestionTextInput
                        placeholder="Mô tả khảo sát"
                        value={survey.description}
                        onChange={(e) =>
                            dispatchApp(handleChangeDescription({ description: e.target.value }))
                        }></QuestionTextInput>
                </div>
                {survey.questions?.length == 0 && (
                    <div className={cx('add')} onClick={handleAddFirstQuestion}>
                        <div className={cx('separate')}></div>
                        <IoIosAddCircleOutline className={cx('icon')} />
                        <div className={cx('separate')}></div>
                    </div>
                )}
                {survey.questions?.map((question, index) => <Question key={question.id} index={index} />)}
            </div>
        </div>
    );
};

export default EditSurveyPage;
