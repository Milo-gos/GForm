import React, { useEffect, useRef, useState } from 'react';
import style from './emailverificationsuccess.module.scss';
import classNames from 'classnames/bind';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux';
import { verifyEmail } from '../../redux/slice/auth';
import PageNotFound from '../PageNotFound';
const cx = classNames.bind(style);

const EmailVerificationSuccessPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        let isIgnore = false;
        // Call API
        dispatch(verifyEmail());
        return () => {
            isIgnore = true;
        };
    }, []);
    const authState = useAppSelector((state) => state.auth);

    return (
        <div className={cx('wrapper')}>
            {authState.verifiedStatus === 'success' && (
                <>
                    <h2>Xác minh email thành công!</h2>
                    <div style={{ textAlign: 'center' }}>
                        <FaRegCircleCheck size={100} />
                    </div>

                    <div
                        className={cx('back-login')}
                        style={{ textAlign: 'center', marginTop: '48px' }}
                    >
                        <Link to={'/signin'}>Quay về đăng nhập</Link>
                    </div>
                </>
            )}
            {authState.verifiedStatus === 'failed' && <PageNotFound />}
        </div>
    );
};

export default EmailVerificationSuccessPage;
