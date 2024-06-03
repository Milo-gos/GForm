import React from 'react';
import style from './answershortanswer.module.scss';
import classNames from 'classnames/bind';
import NormalTextInput from '../NormalTextInput';

const cx = classNames.bind(style);

const AnswerShortAnswer = () => {
    return (
        <div className={cx('wrapper')}>
            <NormalTextInput placeholder="Câu trả lời của bạn" style={{ padding: '6px 0px' }} />
        </div>
    );
};

export default AnswerShortAnswer;
