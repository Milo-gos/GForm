import React, { useState } from 'react';
import style from './answer.module.scss';
import classNames from 'classnames/bind';
import QuestionType from '../../utils/interfaces/questionType';
import AnswerShortAnswer from '../AnswerShortAnswer';
import AnswerParagraph from '../AnswerParagraph';
import AnswerDropdown from '../AnswerDropdown';
import AnswerCheckbox from '../AnswerCheckbox';
import AnswerRadioButton from '../AnswerRadioButton';
import AnswerLinearScale from '../AnswerLinearScale';
import AnswerRadioButtonGrid from '../AnswerRadioButtonGrid';

const cx = classNames.bind(style);

interface Props {
    questionType: QuestionType;
}
const Answer = ({ questionType }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('question-wrapper')}>
                <span className={cx('question')}>Câu hỏi</span> <span className={cx('required')}>*</span>
            </div>
            <div className={cx('description')}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero possimus fugit minus.
            </div>

            <div style={{ marginTop: '24px' }}>
                {questionType === QuestionType.ShortAnswer && <AnswerShortAnswer />}
                {questionType === QuestionType.Paragraph && <AnswerParagraph />}
                {questionType === QuestionType.Dropdown && <AnswerDropdown />}
                {questionType === QuestionType.Checkbox && <AnswerCheckbox />}
                {questionType === QuestionType.RadioButton && <AnswerRadioButton />}
                {questionType === QuestionType.LinearScale && <AnswerLinearScale />}
                {questionType === QuestionType.RadioButtonGrid && <AnswerRadioButtonGrid />}
            </div>
        </div>
    );
};

export default Answer;
