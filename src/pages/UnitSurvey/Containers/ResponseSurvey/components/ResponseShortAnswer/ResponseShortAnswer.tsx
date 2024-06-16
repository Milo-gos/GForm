import React, { useState } from 'react';
import style from './responseshortanswer.module.scss';
import classNames from 'classnames/bind';
import QuestionResponseInterface from '../../../../../../utils/interfaces/question-response';

const cx = classNames.bind(style);

interface Props {
    questionResponse: QuestionResponseInterface;
}
const ResponseShortAnswer = ({ questionResponse }: Props) => {
    // const question = useAppSelector((state) => state.submitForm.questions[index]);
    // const questionType = question.questionType;

    return (
        <div className={cx('wrapper')}>
            {questionResponse.textResponses.map((text, index) => {
                return (
                    <div className={cx('answer-text')} key={index}>
                        <p>{text}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default ResponseShortAnswer;
