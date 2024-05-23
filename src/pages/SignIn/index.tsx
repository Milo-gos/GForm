import React, { useEffect } from 'react';
import style from './signin.module.scss';
import { z } from 'zod';
import classNames from 'classnames/bind';
import { MyButton, TextInput } from '../../components';
import { Google } from '../../assets/images';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../redux';
import { signIn } from '../../redux/slice/auth';
const cx = classNames.bind(style);

const SignInSchema = z.object({
    email: z.string().nonempty('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: z.string().nonempty('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

const SignInPage = () => {
    const navigate = useNavigate();
    const dispatchApp = useAppDispatch();
    const {
        setError,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInSchemaType>({
        resolver: zodResolver(SignInSchema),
        mode: 'onSubmit',
        shouldFocusError: true,
    });

    const onbsumit = async (user: SignInSchemaType) => {
        try {
            await dispatchApp(signIn(user)).unwrap();
            alert('Đăng nhập thành công');
        } catch (error) {
            setError('password', {
                type: 'server',
                message: (error as string) || '',
            });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h2>Đăng nhập</h2>
            <form className={cx('form')} onSubmit={handleSubmit(onbsumit)}>
                <div>
                    <TextInput placeholder="Email" name="email" register={register}></TextInput>

                    <p
                        style={{
                            marginTop: '4px',
                            fontSize: '14px',
                            color: '#db4437',
                        }}>
                        {errors.email?.message}
                    </p>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <div>
                        <TextInput
                            placeholder="Mật khẩu"
                            name="password"
                            typePassword={true}
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
                    <Link to={'/forgot-password'} className={cx('forgot-password')}>
                        Quên mật khẩu
                    </Link>
                </div>
                <MyButton textButton="Đăng nhập" size="big" type="submit"></MyButton>
            </form>
            <div className={cx('separate')}>
                <div></div>
                <span>hoặc</span>
                <div></div>
            </div>
            <div className={cx('login-google')}>
                <img src={Google} />
                <span>Đăng nhập với Google</span>
            </div>
            <div className={cx('confirm-not-have-account')}>
                <span>Bạn chưa có tài khoản?</span>

                <Link to={'/signup'}>Đăng ký</Link>
            </div>
        </div>
    );
};

export default SignInPage;
