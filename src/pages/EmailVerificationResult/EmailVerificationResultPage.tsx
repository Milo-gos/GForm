import React, { useEffect, useRef, useState } from 'react';
import style from './email-verification-result.module.scss';
import classNames from 'classnames/bind';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import PageNotFound from '../PageNotFound';
import { useVerifyEmailMutation } from '../../hooks/api-hooks/mutations';
const cx = classNames.bind(style);

const EmailVerificationResultPage = () => {
    const dispatch = useAppDispatch();
    const { tokenLink } = useParams();
    const [result, setResult] = useState('');
    const VerifyEmailMutation = useVerifyEmailMutation();
    useEffect(() => {
        if (tokenLink) {
            VerifyEmailMutation.mutate(tokenLink, {
                onSuccess() {
                    console.log('success');
                    setResult('success');
                },
                onError(error) {
                    console.log(error);
                    setResult('failed');
                },
            });
        }
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
