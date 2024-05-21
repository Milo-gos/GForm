import React, { ReactElement } from 'react';
import style from './surveylayout.module.scss';
import classNames from 'classnames/bind';
import LeftSideSurveyLayout from './LeftSideSurveyLayout';
const cx = classNames.bind(style);

const SurveyLayout = ({ children }: { children?: JSX.Element }) => {
    return (
        <div className={cx('wrapper')}>
            <LeftSideSurveyLayout />
            <div className={cx('right-side')}>
                <div className={cx('header')}>SURVEY LAYOUT</div>

                {children}
            </div>
        </div>
    );
};

export default SurveyLayout;
