import React from 'react';
import style from './user-survey-management-layout.module.scss';
import classNames from 'classnames/bind';
import USMHeader from './components/USMHeader';
import USMSidebar from './components/USMSidebar';

const cx = classNames.bind(style);

const UserSurveyManagementLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <div className={cx('wrapper')}>
            <USMHeader />
            <div className={cx('body')}>
                <USMSidebar />
                <div className={cx('children-wrapper')}>{children}</div>
            </div>
        </div>
    );
};

export default UserSurveyManagementLayout;
