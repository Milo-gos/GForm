import React, { useEffect, useRef, useState } from 'react';
import style from './emailverification.module.scss';
import classNames from 'classnames/bind';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

const EmailVerificationPage = () => {
    const refId = useRef<any>(null);
    const [time, setTime] = useState(new Date(5 * 60 * 1000));
    const minute = time.getMinutes() + '';
    const second =
        time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();

    if (minute === '0' && second === '00') {
        clearInterval(refId.current);
    }
    useEffect(() => {
        refId.current = setInterval(() => {
            setTime((prev) => new Date(prev.getTime() - 1000));
        }, 1000);

        return () => {
            clearInterval(refId.current);
        };
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2>Xác minh email</h2>
            <div style={{ textAlign: 'center' }}>
                <MdOutlineMarkEmailRead size={100} />
            </div>
            <p style={{ textAlign: 'center' }}>
                Một liên kết đã được gửi đến email của bạn. Vui lòng truy cập
                liên kết để hoàn tất xác minh tài khoản. Liên kết sẽ hết hạn sau{' '}
                <span>{`${minute}:${second}`}</span>
            </p>
            <div
                className={cx('back-login')}
                style={{ textAlign: 'center', marginTop: '48px' }}
            >
                <Link to={'/signin'}>Quay về đăng nhập</Link>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
