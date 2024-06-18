import React, { useEffect, useRef, useState } from 'react';
import style from './questionshortanswer.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

interface Props {
    indexQuestion: number;
}
const QuestionShortAnswer = ({}: Props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('answer')}>Câu trả lời ngắn</div>
        </div>
    );
};

export default QuestionShortAnswer;
