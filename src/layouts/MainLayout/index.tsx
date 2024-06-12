import React from 'react';
import style from './mainlayout.module.scss';
import classNames from 'classnames/bind';
import HomeSidebar from './HomeSidebar';
import { useAppDispatch } from '../../redux';
import Header from './Header';

const cx = classNames.bind(style);

const MainLayout = ({ children }: { children: JSX.Element }) => {
    const dispatchApp = useAppDispatch();

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('body')}>
                <HomeSidebar />
                <div className={cx('children-wrapper')}>{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
