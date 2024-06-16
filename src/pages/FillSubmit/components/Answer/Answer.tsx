import React, { memo, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import style from './answer.module.scss';
import classNames from 'classnames/bind';
import QuestionType from '../../../../utils/interfaces/questionType';
import AnswerParagraph from '../AnswerParagraph';
import AnswerDropdown from '../AnswerDropdown';
import AnswerCheckbox from '../AnswerCheckbox';
import AnswerRadioButton from '../AnswerRadioButton';
import AnswerLinearScale from '../AnswerLinearScale';
import { useAppSelector } from '../../../../redux';
import AnswerShortAnswer from '../AnswerShortAnswer';
import AnswerRadioButtonGrid from '../AnswerRadioButtonGrid';

const cx = classNames.bind(style);

interface Props {
    index: number;
}
const Answer = ({ index }: Props) => {
    const question = useAppSelector((state) => state.submitForm.questions[index]);
    const error = useAppSelector((state) => state.submitForm.errorQuestions[index]);
    const questionType = question.questionType;

    return (
        <div
            className={cx('wrapper', {
                isErrorForm: error !== '',
            })}>
            <div className={cx('question-wrapper')}>
                <span className={cx('question')}>{question.question}</span>
                {question.isRequired && <span className={cx('required')}>*</span>}
            </div>
            {question.isHasDescription && <div className={cx('description')}>{question.description}</div>}

            <div style={{ marginTop: '24px' }}>
                {questionType === QuestionType.ShortAnswer && <AnswerShortAnswer indexQuestion={index} />}
                {questionType === QuestionType.Paragraph && <AnswerParagraph indexQuestion={index} />}
                {questionType === QuestionType.Dropdown && <AnswerDropdown indexQuestion={index} />}
                {questionType === QuestionType.Checkbox && <AnswerCheckbox indexQuestion={index} />}
                {questionType === QuestionType.RadioButton && <AnswerRadioButton indexQuestion={index} />}
                {questionType === QuestionType.LinearScale && <AnswerLinearScale indexQuestion={index} />}
                {questionType === QuestionType.RadioButtonGrid && <AnswerRadioButtonGrid indexQuestion={index} />}
                {error && (
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px', gap: '8px' }}>
                        <InfoOutlinedIcon style={{ color: '#db4437' }} />
                        <span
                            style={{
                                fontSize: '16px',
                                color: '#db4437',
                            }}>
                            {error}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(Answer);
