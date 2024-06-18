import React from 'react';

import style from './home.module.scss';
import classNames from 'classnames/bind';
import Section from './components/Section';
import HomeHeader from './components/HomeHeader';

const cx = classNames.bind(style);

const HomePage = () => {
    return (
        <div className={cx('wrapper')}>
            <HomeHeader />
            <Section />
        </div>
    );
};

export default HomePage;
