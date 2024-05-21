import React, { useEffect } from 'react';
import style from './signup.module.scss';
import classNames from 'classnames/bind';
import { MyButton, TextInput } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerUser, resetError, setErrorEmailSignUp } from '../../redux/slice/auth';
import { useAppDispatch, useAppSelector } from '../../redux';
const cx = classNames.bind(style);

const SignUpSchema = z
    .object({
        fullName: z.string().nonempty('Vui lòng nhập họ tên'),
        email: z.string().nonempty('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
        password: z.string().nonempty('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
        confirmPassword: z.string().nonempty('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không trùng khớp',
        path: ['confirmPassword'],
    });

type SignUpSchemaType = z.infer<typeof SignUpSchema>;
const SignUpPage = () => {
    const dispatchApp = useAppDispatch();
    const navigate = useNavigate();
    const authState = useAppSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpSchemaType>({
        resolver: zodResolver(SignUpSchema),
        mode: 'onSubmit',
        shouldFocusError: true,
    });
    useEffect(() => {
        dispatchApp(resetError(''));
    }, []);
    const onbsumit = (user: SignUpSchemaType) => {
        dispatchApp(registerUser({ user, navigate }));
    };
    useEffect(() => {
        if (errors.email?.message && authState.errorEmailSignUp) dispatchApp(setErrorEmailSignUp(''));
    }, [errors.email?.message]);

    return (
        <div className={cx('wrapper')}>
            <h2>Đăng ký</h2>
            <form className={cx('form')} onSubmit={handleSubmit(onbsumit)}>
                <div>
                    <TextInput placeholder="Họ và tên" name="fullName" register={register}></TextInput>
                    <p
                        style={{
                            marginTop: '4px',
                            fontSize: '14px',
                            color: '#db4437',
                        }}>
                        {errors.fullName?.message}
                    </p>
                </div>
                <div>
                    <TextInput placeholder="Email" name="email" register={register}></TextInput>
                    <p
                        style={{
                            marginTop: '4px',
                            fontSize: '14px',
                            color: '#db4437',
                        }}>
                        {errors.email?.message || authState.errorEmailSignUp}
                    </p>
                </div>

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
                <div style={{ marginTop: '16px' }}>
                    <MyButton textButton="Đăng ký" size="big" type="submit"></MyButton>
                </div>
            </form>

            <div className={cx('confirm-have-account')}>
                <span>Bạn đã có tài khoản?</span>
                <Link to={'/signin'}>Đăng nhập</Link>
            </div>
        </div>
    );
};

export default SignUpPage;
