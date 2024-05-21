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
    const [result, setResult] = useState('');

    useEffect(() => {
        let isIgnore = false;
        const verifyFunction = async (tokenLink: string) => {
            try {
                await dispatch(verifyEmail(tokenLink)).unwrap();
                setResult('success');
            } catch (error) {
                setResult('failed');
            }
        };

        // Call API

        if (tokenLink) {
            if (!isIgnore) verifyFunction(tokenLink);
        }

        return () => {
            isIgnore = true;
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            {result === 'success' && (
                <>
                    <h2>Xác minh email thành công!</h2>
                    <div style={{ textAlign: 'center' }}>
                        <FaRegCircleCheck size={100} />
                    </div>

                    <div className={cx('back-login')} style={{ textAlign: 'center', marginTop: '48px' }}>
                        <Link to={'/signin'}>Quay về đăng nhập</Link>
                    </div>
                </>
            )}
            {result === 'failed' && <PageNotFound />}
        </div>
    );
};

export default EmailVerificationResultPage;
