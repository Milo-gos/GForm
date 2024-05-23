import React, { useEffect, useRef, useState } from 'react';
import style from './signup.module.scss';
import classNames from 'classnames/bind';
import { MyButton, TextInput } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux';
import { registerUser } from '../../redux/slice/auth';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
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
    const [result, setResult] = useState<string>('');
    const dispatchApp = useAppDispatch();
    const navigate = useNavigate();
    const {
        setError,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpSchemaType>({
        resolver: zodResolver(SignUpSchema),
        mode: 'onSubmit',
        shouldFocusError: true,
    });

    const refId = useRef<any>(null);
    const [time, setTime] = useState(new Date(5 * 60 * 1000));
    const minute = time.getMinutes() + '';
    const second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();

    if (minute === '0' && second === '00') {
        clearInterval(refId.current);
    }
    const handleSignUpSuccessfully = () => {
        setResult('success');
        refId.current = setInterval(() => {
            setTime((prev) => new Date(prev.getTime() - 1000));
        }, 1000);
        navigate('/signup#successfully');
    };
    const onbsumit = async (user: SignUpSchemaType) => {
        try {
            await dispatchApp(registerUser(user)).unwrap();
            handleSignUpSuccessfully();
        } catch (error) {
            setError('email', {
                type: 'server',
                message: (error as string) || '',
            });
        }
    };
    useEffect(() => {
        return () => {
            clearInterval(refId.current);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            {result !== 'success' ? (
                <>
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
                                {errors.email?.message}
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
                </>
            ) : (
                <>
                    <h2>Xác minh email</h2>
                    <div style={{ textAlign: 'center' }}>
                        <MdOutlineMarkEmailRead size={100} />
                    </div>
                    <p style={{ textAlign: 'center' }}>
                        Một liên kết đã được gửi đến email của bạn. Vui lòng truy cập liên kết để hoàn tất xác minh tài
                        khoản. Liên kết sẽ hết hạn sau <span>{`${minute}:${second}`}</span>
                    </p>
                    <div className={cx('back-login')} style={{ textAlign: 'center', marginTop: '48px' }}>
                        <Link to={'/signin'}>Quay về đăng nhập</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default SignUpPage;
