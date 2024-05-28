import React, { useEffect, useState } from 'react';
import style from './addnewsurveyquestion.module.scss';
import classNames from 'classnames/bind';
import { Question, QuestionTextInput } from '../../components';
import QuestionType from '../../utils/interfaces/questionType';
import { useAppDispatch, useAppSelector } from '../../redux';
import { insertQuestion, setNewSurvey } from '../../redux/slice/survey';
import { IoIosAddCircleOutline } from 'react-icons/io';

const cx = classNames.bind(style);

const AddNewSurveyQuestionPage = () => {
    const dispatchApp = useAppDispatch();
    const survey = useAppSelector((state) => state.survey);
    useEffect(() => {
        dispatchApp(setNewSurvey());
    }, []);

    const handleAddFirstQuestion = () => {
        dispatchApp(insertQuestion(0));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('background')}>
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" />
                </div>
                <div className={cx('container', 'active', 'form-header')}>
                    <QuestionTextInput placeholder="Tiêu đề khảo sát" isTitleForm={true}></QuestionTextInput>
                    <QuestionTextInput placeholder="Mô tả khảo sát"></QuestionTextInput>
                </div>
                {survey.questions.length == 0 && (
                    <div className={cx('add')} onClick={handleAddFirstQuestion}>
                        <div className={cx('separate')}></div>
                        <IoIosAddCircleOutline className={cx('icon')} />
                        <div className={cx('separate')}></div>
                    </div>
                )}
                {survey.questions.map((question, index) => (
                    <Question key={question.id} index={index} />
                ))}
            </div>
        </div>
    );
};

export default AddNewSurveyQuestionPage;
