import React, { useState } from 'react';
import style from './addnewsurveyquestion.module.scss';
import classNames from 'classnames/bind';
import { Question, QuestionTextInput } from '../../components';
import QuestionType from '../../utils/questionType';

const cx = classNames.bind(style);

const AddNewSurveyQuestionPage = () => {
    const [questions, setQuestions] = useState([...Object.values(QuestionType)]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('background')}>
                    <img src="https://lh7-us.googleusercontent.com/9lAdYA6VtlQXffFuiByK_CiCbqBw1_U2WLyFxffILM_cSVaac_nbMN4YyydbrxhxpDE8wTAW1e4cFQEioP3D7VDouKFpchj-FTjftokvBTOg4v8aKIStnhcrKONGtrOQZUYlCoqAGfuqyOLZYszgytj2Omvzww" />
                </div>
                <div className={cx('container', 'active', 'form-header')}>
                    <QuestionTextInput placeholder="Tiêu đề khảo sát" isTitleForm={true}></QuestionTextInput>
                    <QuestionTextInput placeholder="Mô tả khảo sát"></QuestionTextInput>
                </div>
                {questions.map((question, index) => (
                    <Question type={question} key={index} id={question} />
                ))}
            </div>
        </div>
    );
};

export default AddNewSurveyQuestionPage;
