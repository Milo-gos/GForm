import React, { useEffect, useState } from 'react';
import style from '../addnewsurvey.module.scss';
import classNames from 'classnames/bind';
import { Question, QuestionTextInput } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../redux';
import {
    handleActiveQuestion,
    handleChangeDescription,
    handleChangeTitle,
    handleInsertQuestion,
    handleSetNewQuestion,
} from '../../../redux/slice/survey';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import useAutoSave from '../../../hooks/useAutoSave';
import useChangeSurveyMutation from '../mutation/changeSurvey';
import useAddFirstQuestionMutation from '../../../components/Question/mutation/addFirstQuestion';

const cx = classNames.bind(style);

const AddNewSurveyQuestionInner = () => {
    const dispatchApp = useAppDispatch();
    const { id } = useParams();
    const survey = useAppSelector((state) => state.survey);
    const ChangeSurveyMutation = useChangeSurveyMutation();

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
    useAutoSave(survey.title, () => {
        ChangeSurveyMutation.mutate(
            {
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
                description: survey.description,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    });

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

export default AddNewSurveyQuestionInner;
