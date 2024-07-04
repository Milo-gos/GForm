import React, { useState } from 'react';
import style from './response-short-answer.module.scss';
import classNames from 'classnames/bind';
import QuestionResponseInterface from '../../../../../../utils/interfaces/QuestionResponse';

const cx = classNames.bind(style);

interface Props {
    questionResponse: QuestionResponseInterface;
}
const ResponseShortAnswer = ({ questionResponse }: Props) => {
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
