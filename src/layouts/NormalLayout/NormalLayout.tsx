import React, { ReactElement, useState } from 'react';
import style from './normallayout.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const NormaltLayout = ({ children }: { children?: JSX.Element }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('children-wrapper')}>{children}</div>
        </div>
    );
};

export default NormaltLayout;
