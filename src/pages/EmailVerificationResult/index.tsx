import React, { useEffect, useRef, useState } from 'react';
import style from './emailverificationresult.module.scss';
import classNames from 'classnames/bind';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux';
import { verifyEmail } from '../../redux/slice/auth';
import PageNotFound from '../PageNotFound';
const cx = classNames.bind(style);

const EmailVerificationResultPage = () => {
    const dispatch = useAppDispatch();
    const { tokenLink } = useParams();
    console.log(tokenLink);
    useEffect(() => {
        let isIgnore = false;
        // Call API

        if (tokenLink) {
            if (!isIgnore) dispatch(verifyEmail(tokenLink));
        }

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

export default EmailVerificationResultPage;
