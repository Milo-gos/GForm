import React, { useEffect, useRef, useState } from 'react';
import style from './pageerror.module.scss';
import classNames from 'classnames/bind';
import { BiSolidErrorAlt } from 'react-icons/bi';

const cx = classNames.bind(style);

const PageError = () => {
    return (
        <div className={cx('wrapper')}>
            <h2>Có lỗi! Vui lòng thử lại</h2>
            <div style={{ textAlign: 'center' }}>
                <BiSolidErrorAlt size={100} />
            </div>
        </div>
    );
};

export default PageError;
