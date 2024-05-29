import React, { useEffect, useRef, useState } from 'react';
import style from './questionparagraph.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

interface Props {
    indexQuestion: number;
}
const QuestionParagraph = ({ indexQuestion }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('answer')}>Câu trả lời dài</div>
        </div>
    );
};

export default QuestionParagraph;
