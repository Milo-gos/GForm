import React, { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import style from './response.module.scss';
import classNames from 'classnames/bind';
import QuestionType from '../../utils/interfaces/questionType';
import AnswerShortAnswer from '../AnswerShortAnswer';
import AnswerParagraph from '../AnswerParagraph';
import AnswerDropdown from '../AnswerDropdown';
import AnswerCheckbox from '../AnswerCheckbox';
import AnswerRadioButton from '../AnswerRadioButton';
import AnswerLinearScale from '../AnswerLinearScale';
import AnswerRadioButtonGrid from '../AnswerRadioButtonGrid';

import { useAppSelector } from '../../redux';
import { error } from 'console';
import ResponseShortAnswer from '../ResponseShortAnswer';
import ResponseParagraph from '../ResponseParagraph';
import ResponseRadioButton from '../ResponseRadioButton';
import ResponseDropdown from '../ResponseDropdown';
import ResponseLinearScale from '../ResponseLinearScale';
import ResponseRadioButtonGrid from '../ResponseRadioButtonGrid';

const cx = classNames.bind(style);

interface Props {
    index?: number;
    questionType?: QuestionType;
}
const Response = ({ questionType }: Props) => {
    // const question = useAppSelector((state) => state.submitForm.questions[index]);
    // const questionType = question.questionType;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('question-wrapper')}>
                <div className={cx('question')}>Câu hỏi ngắn</div>
                <span className={cx('responses')}>6 phản hồi</span>
            </div>

            <div style={{ marginTop: '24px' }}>
                {questionType == QuestionType.ShortAnswer && <ResponseShortAnswer />}
                {questionType == QuestionType.Paragraph && <ResponseParagraph />}
                {questionType == QuestionType.RadioButton && <ResponseRadioButton />}
                {questionType == QuestionType.Dropdown && <ResponseDropdown />}
                {questionType == QuestionType.LinearScale && <ResponseLinearScale />}
                {questionType == QuestionType.RadioButtonGrid && <ResponseRadioButtonGrid />}
            </div>
        </div>
    );
};

export default Response;
