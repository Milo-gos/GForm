import React from 'react';
import style from './sharedsurvey.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);
const SharedSurveyPage = () => {
    const navigate = useNavigate();
    return <div className={cx('wrapper')}></div>;
};

export default SharedSurveyPage;
