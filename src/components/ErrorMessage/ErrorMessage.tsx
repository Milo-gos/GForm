import React from 'react';
import style from './errormessage.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

interface Props {
    message?: string;
}
const ErrorMessage = ({ message }: Props) => {
    return <p className={cx('wrapper')}>{message}</p>;
};

export default ErrorMessage;
