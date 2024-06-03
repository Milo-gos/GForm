import React from 'react';
import style from './answerparagraph.module.scss';
import classNames from 'classnames/bind';
import NormalTextInput from '../NormalTextInput';

const cx = classNames.bind(style);

const AnswerParagraph = () => {
    return (
        <div className={cx('wrapper')}>
            <NormalTextInput placeholder="Câu trả lời của bạn" style={{ padding: '6px 0px' }} />
        </div>
    );
};

export default AnswerParagraph;
