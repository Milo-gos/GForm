import React, { useEffect, useRef, useState } from 'react';
import style from './description.module.scss';
import classNames from 'classnames/bind';
import TextInput from '../NormalTextInput';
import QuestionTextInput from '../QuestionTextInput';
const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
}
const Description = ({ isActiveQuestion }: Props) => {
    return (
        <div className={cx('wrapper')}>
            {isActiveQuestion ? (
                <QuestionTextInput
                    placeholder="Mô tả (tùy chọn)"
                    isActiveQuestion={isActiveQuestion}></QuestionTextInput>
            ) : (
                <div className={cx('description')}>{'Mô tả (tùy chọn)'}</div>
            )}
        </div>
    );
};

export default Description;
