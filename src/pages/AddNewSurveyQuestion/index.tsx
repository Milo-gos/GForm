import React from 'react';
import style from './addnewsurveyquestion.module.scss';
import classNames from 'classnames/bind';
import { Question, TextInput } from '../../components';
import QuestionType from '../../utils/questionType';
const cx = classNames.bind(style);

const AddNewSurveyQuestionPage = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('background')}>
                    <img src="https://lh7-us.googleusercontent.com/9lAdYA6VtlQXffFuiByK_CiCbqBw1_U2WLyFxffILM_cSVaac_nbMN4YyydbrxhxpDE8wTAW1e4cFQEioP3D7VDouKFpchj-FTjftokvBTOg4v8aKIStnhcrKONGtrOQZUYlCoqAGfuqyOLZYszgytj2Omvzww" />
                </div>
                <div className={cx('container', 'active', 'form-header')}>
                    <TextInput
                        placeholder="Tiêu đề khảo sát"
                        fontSize="24px"
                        padding="8px 8px"
                        boldPlaceHolder={true}></TextInput>
                    <TextInput placeholder="Mô tả khảo sát"></TextInput>
                </div>
                <Question type={QuestionType.ShortAnswer} />
                <Question type={QuestionType.Paragraph} />
                <Question type={QuestionType.Dropdown} />
                <Question type={QuestionType.Checkbox} />
                <Question type={QuestionType.RadioButton} />
                <Question type={QuestionType.LinearScale} />
            </div>
        </div>
    );
};

export default AddNewSurveyQuestionPage;
