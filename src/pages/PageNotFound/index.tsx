import React, { useEffect, useRef, useState } from 'react';
import style from './pagenotfound.module.scss';
import classNames from 'classnames/bind';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

const PageNotFound = () => {
    return (
        <div className={cx('wrapper')}>
            <h2>Trang không tồn tại</h2>
            <div style={{ textAlign: 'center' }}>
                <BiSolidErrorAlt size={100} />
            </div>
        </div>
    );
};

export default PageNotFound;
