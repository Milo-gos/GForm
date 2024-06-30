import React, { useMemo, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import style from './response.module.scss';
import classNames from 'classnames/bind';
import QuestionType from '../../../../../../utils/interfaces/QuestionType';
import ResponseShortAnswer from '../ResponseShortAnswer';
import ResponseParagraph from '../ResponseParagraph';
import ResponseRadioButton from '../ResponseRadioButton';
import ResponseDropdown from '../ResponseDropdown';
import ResponseLinearScale from '../ResponseLinearScale';
import ResponseRadioButtonGrid from '../ResponseRadioButtonGrid';
import QuestionResponseInterface from '../../../../../../utils/interfaces/QuestionResponse';
import ResponseCheckbox from '../ResponseCheckbox';

const cx = classNames.bind(style);

interface Props {
    index?: number;
    questionResponse: QuestionResponseInterface;
}
const Response = ({ questionResponse }: Props) => {
    const questionType = questionResponse.questionType;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('question-wrapper')}>
                <div className={cx('question')}>{questionResponse.questionContent}</div>
                <span className={cx('responses')}>{questionResponse.numberOfResponses} phản hồi</span>
            </div>

            <div style={{ marginTop: '24px' }}>
                {questionType == QuestionType.ShortAnswer && (
                    <ResponseShortAnswer questionResponse={questionResponse} />
                )}
                {questionType == QuestionType.Paragraph && <ResponseParagraph questionResponse={questionResponse} />}
                {questionType == QuestionType.RadioButton && (
                    <ResponseRadioButton questionResponse={questionResponse} />
                )}
                {questionType == QuestionType.Checkbox && <ResponseCheckbox questionResponse={questionResponse} />}
                {questionType == QuestionType.Dropdown && <ResponseDropdown questionResponse={questionResponse} />}
                {questionType == QuestionType.LinearScale && (
                    <ResponseLinearScale questionResponse={questionResponse} />
                )}
                {questionType == QuestionType.RadioButtonGrid && (
                    <ResponseRadioButtonGrid questionResponse={questionResponse} />
                )}
            </div>
        </div>
    );
};

export default Response;
