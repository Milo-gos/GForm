import React, { useEffect, useRef, useState } from 'react';
import style from './forgotpassword.module.scss';
import classNames from 'classnames/bind';
import { MyButton, NormalTextInput } from '../../components';
import { Google, ImageSignin, Logo } from '../../assets/images';
import { Link } from 'react-router-dom';
import { string, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../redux';
import useCheckExistEmailMutation from './mutation/checkExistEmail';
import { setLoading } from '../../redux/slice/global';
const cx = classNames.bind(style);

const object = z.object({
    email: z.string().nonempty('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
});

const ForgotPasswordPage = () => {
    const dispatchApp = useAppDispatch();

    const [showNotification, setShowNotification] = useState(false);
    const refId = useRef<any>(null);
    const [time, setTime] = useState(new Date(5 * 60 * 1000));
    const minute = time.getMinutes() + '';
    const second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    const {
        handleSubmit,
        setError,
        register,
        formState: { errors },
    } = useForm<{ email: string }>({
        resolver: zodResolver(object),
        mode: 'onSubmit',
        shouldFocusError: true,
    });
    if (minute === '0' && second === '00') {
        clearInterval(refId.current);
    }
    const CheckExistEmailMutation = useCheckExistEmailMutation();
    useEffect(() => {
        if (showNotification) {
            refId.current = setInterval(() => {
                setTime((prev) => new Date(prev.getTime() - 1000));
            }, 1000);
        }
        return () => {
            clearInterval(refId.current);
        };
    }, [showNotification]);
    const onsubmit = async ({ email }: { email: string }) => {
        dispatchApp(setLoading(true));

        CheckExistEmailMutation.mutate(email, {
            onSuccess() {
                dispatchApp(setLoading(false));

                setShowNotification(true);
            },
            onError(error: any) {
                dispatchApp(setLoading(false));

                setError('email', {
                    type: 'server',
                    message: error.response.data.message,
                });
            },
        });
    };
    return (
        <div className={cx('wrapper')}>
            <h2>Quên mật khẩu</h2>
            <form className={cx('form')} onSubmit={handleSubmit(onsubmit)}>
                <div>
                    <NormalTextInput
                        placeholder="Nhập email tài khoản"
                        name="email"
                        register={register}></NormalTextInput>
                    <p
                        style={{
                            marginTop: '4px',
                            fontSize: '14px',
                            color: '#db4437',
                        }}>
                        {errors.email?.message}
                    </p>
                </div>

                {showNotification && (
                    <p style={{ textAlign: 'center' }}>
                        Một liên kết đã được gửi đến email của bạn. Vui lòng truy cập liên kết để thay đổi mật khẩu.
                        Liên kết sẽ hết hạn sau <span>{`${minute}:${second}`}</span>
                    </p>
                )}
                {!showNotification && <MyButton textButton="Tiếp tục" size="big"></MyButton>}
            </form>
            <div className={cx('back-login')}>
                <Link to={'/signin'}>Quay về đăng nhập</Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
