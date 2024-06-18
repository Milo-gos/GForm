import React from 'react';
import style from './usersurveymanagementlayout.module.scss';
import classNames from 'classnames/bind';
import { useAppDispatch } from '../../redux';
import USMHeader from './components/USMHeader';
import USMSidebar from './components/USMSidebar';

const cx = classNames.bind(style);

const UserSurveyManagementLayout = ({ children }: { children: JSX.Element }) => {
    const dispatchApp = useAppDispatch();

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
