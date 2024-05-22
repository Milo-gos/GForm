import React, { useEffect, useRef, useState } from 'react';
import style from './resetpassword.module.scss';
import classNames from 'classnames/bind';
import { MyButton, TextInput } from '../../components';
import { Google, ImageSignin, Logo } from '../../assets/images';
import { Link } from 'react-router-dom';
import { string, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../redux';
import { checkExistEmail, resetPassword } from '../../redux/slice/auth';
const cx = classNames.bind(style);

const ResetPasswordSchema = z
    .object({
        password: z.string().nonempty('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
        confirmPassword: z.string().nonempty('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không trùng khớp',
        path: ['confirmPassword'],
    });
type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

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
    } = useForm<ResetPasswordType>({
        resolver: zodResolver(ResetPasswordSchema),
        mode: 'onSubmit',
        shouldFocusError: true,
    });
    if (minute === '0' && second === '00') {
        clearInterval(refId.current);
    }
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
    const onsubmit = async ({ password, confirmPassword }: ResetPasswordType) => {
        try {
            await dispatchApp(resetPassword(password)).unwrap();
            setShowNotification(true);
        } catch (error) {
            setError('confirmPassword', {
                type: 'server',
                message: (error as string) || '',
            });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h2>Thay đổi mật khẩu</h2>
            <form className={cx('form')} onSubmit={handleSubmit(onsubmit)}>
                <div>
                    <TextInput
                        placeholder="Mật khẩu"
                        typePassword={true}
                        name="password"
                        register={register}></TextInput>
                    <p
                        style={{
                            marginTop: '4px',
                            fontSize: '14px',
                            color: '#db4437',
                        }}>
                        {errors.password?.message}
                    </p>
                </div>
                <div>
                    <TextInput
                        placeholder="Nhập lại mật khẩu"
                        name="confirmPassword"
                        typePassword={true}
                        register={register}></TextInput>
                    <p
                        style={{
                            marginTop: '4px',
                            fontSize: '14px',
                            color: '#db4437',
                        }}>
                        {errors.confirmPassword?.message}
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
