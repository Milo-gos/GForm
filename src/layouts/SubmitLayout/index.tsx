import React, { ReactElement, useState } from 'react';
import style from './submit.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const SubmitLayout = ({ children }: { children?: JSX.Element }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('children-wrapper')}>{children}</div>
        </div>
    );
};

export default SubmitLayout;
