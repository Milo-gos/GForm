import React, { useEffect, useRef, useState } from 'react';
import style from './resetpassword.module.scss';
import classNames from 'classnames/bind';
import { MyButton, NormalTextInput } from '../../components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { string, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../redux';
import { checkExistEmail, resetPassword, verifyLinkResetPassword } from '../../redux/slice/auth';
import PageNotFound from '../PageNotFound';
import { FaRegCircleCheck } from 'react-icons/fa6';
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

const ResetPasswordPage = () => {
    const dispatchApp = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const { tokenLinkResetPassword } = useParams();
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

    useEffect(() => {
        const verifyFunction = async (tokenLinkResetPassword: string) => {
            try {
                const email = await dispatchApp(verifyLinkResetPassword(tokenLinkResetPassword)).unwrap();
                setEmail(email);
                setResult('success');
            } catch (error) {
                setResult('failed');
            }
        };

        if (tokenLinkResetPassword) verifyFunction(tokenLinkResetPassword);
    }, []);

    const onsubmit = async ({ password }: ResetPasswordType) => {
        try {
            await dispatchApp(resetPassword({ email: email, password: password })).unwrap();
            setResult('reset-success');
        } catch (error) {
            setError('confirmPassword', {
                type: 'server',
                message: (error as string) || '',
            });
        }
    };
    return (
        <div className={cx('wrapper')}>
            {result === 'success' && (
                <>
                    <h2>Thay đổi mật khẩu</h2>
                    <form className={cx('form')} onSubmit={handleSubmit(onsubmit)}>
                        <div>
                            <NormalTextInput
                                placeholder="Nhập mật khẩu mới"
                                typePassword={true}
                                name="password"
                                register={register}></NormalTextInput>
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
                            <NormalTextInput
                                placeholder="Nhập lại mật khẩu"
                                name="confirmPassword"
                                typePassword={true}
                                register={register}></NormalTextInput>
                            <p
                                style={{
                                    marginTop: '4px',
                                    fontSize: '14px',
                                    color: '#db4437',
                                }}>
                                {errors.confirmPassword?.message}
                            </p>
                        </div>
                        <MyButton textButton="Xác nhận" size="big"></MyButton>
                    </form>
                </>
            )}
            {result === 'failed' && <PageNotFound />}
            {result === 'reset-success' && (
                <>
                    <h2 style={{ fontSize: '36px' }}>Cập nhật mật khẩu thành công</h2>
                    <div style={{ textAlign: 'center' }}>
                        <FaRegCircleCheck size={100} />
                    </div>

                    <div className={cx('back-login')} style={{ textAlign: 'center', marginTop: '48px' }}>
                        <Link to={'/signin'}>Quay về đăng nhập</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResetPasswordPage;
