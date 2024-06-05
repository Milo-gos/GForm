import React, { useState } from 'react';
import style from './responseparagraph.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

interface Props {
    index: number;
}
const ResponseParagraph = () => {
    // const question = useAppSelector((state) => state.submitForm.questions[index]);
    // const questionType = question.questionType;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('answer-text')}>
                <p>ffsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdffsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdffsd</p>
            </div>
            <div className={cx('answer-text')}>
                <p>ffsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdffsdfdsfdsfsdfdsfdsfsdfdsfdsfsdfdsfdsfsdffsd</p>
            </div>
        </div>
    );
};

export default ResponseParagraph;
