import React, { useEffect, useRef, useState } from 'react';
import style from './resetpassword.module.scss';
import classNames from 'classnames/bind';
import { ErrorMessage, MyButton, NormalTextInput } from '../../components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { string, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../redux';
import PageNotFound from '../PageNotFound';
import { FaRegCircleCheck } from 'react-icons/fa6';
import useVerifyLinkResetPasswordMutation from './mutation/verifyLinkResetPassword';
import useResetPasswordMutation from './mutation/resetPassword';
import { setLoading } from '../../redux/slice/global';
import { useTranslation } from 'react-i18next';
import i18n from '../../config/i18n';
const cx = classNames.bind(style);

const ResetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(1, {
                message: i18n.t('validation:password.please_enter_password'),
            })
            .min(6, i18n.t('validation:password.password_must_be_at_least_6_characters_long')),
        confirmPassword: z
            .string()
            .min(1, i18n.t('validation:password.please_enter_password'))
            .min(6, i18n.t('validation:password.password_must_be_at_least_6_characters_long')),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: i18n.t('validation:password.password_does_not_match'),
        path: ['confirmPassword'],
    });
type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordPage = () => {
    const { t } = useTranslation('auth');
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
    const VerifyLinkResetPasswordMutation = useVerifyLinkResetPasswordMutation();
    useEffect(() => {
        if (tokenLinkResetPassword)
            VerifyLinkResetPasswordMutation.mutate(tokenLinkResetPassword, {
                onSuccess(data) {
                    setEmail(data);
                    setResult('success');
                },
                onError() {
                    setResult('failed');
                },
            });
    }, []);

    const ResetPasswordMutation = useResetPasswordMutation();
    const onsubmit = async ({ password }: ResetPasswordType) => {
        dispatchApp(setLoading(true));
        ResetPasswordMutation.mutate(
            { email: email, password: password },
            {
                onSuccess() {
                    dispatchApp(setLoading(false));

                    setResult('reset-success');
                },
                onError(error: any) {
                    dispatchApp(setLoading(false));

                    setError('confirmPassword', {
                        type: 'server',
                        message: error.response.data.message,
                    });
                },
            },
        );
    };
    return (
        <div className={cx('wrapper')}>
            {result === 'success' && (
                <>
                    <h2>{t('change_password')}</h2>
                    <form className={cx('form')} onSubmit={handleSubmit(onsubmit)}>
                        <div>
                            <NormalTextInput
                                placeholder={t('enter_new_password')}
                                typePassword={true}
                                name="password"
                                register={register}></NormalTextInput>
                            <ErrorMessage message={errors.password?.message} />
                        </div>
                        <div>
                            <NormalTextInput
                                placeholder={t('confirm_password')}
                                name="confirmPassword"
                                typePassword={true}
                                register={register}></NormalTextInput>

                            <ErrorMessage message={errors.confirmPassword?.message} />
                        </div>
                        <MyButton textButton={t('accept')} size="big"></MyButton>
                    </form>
                </>
            )}
            {result === 'failed' && <PageNotFound />}
            {result === 'reset-success' && (
                <>
                    <h2 style={{ fontSize: '36px' }}>{t('password_update_successful')}</h2>
                    <div style={{ textAlign: 'center' }}>
                        <FaRegCircleCheck size={100} />
                    </div>

                    <div className={cx('back-login')} style={{ textAlign: 'center', marginTop: '48px' }}>
                        <Link to={'/signin'}>{t('back_to_login')}</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResetPasswordPage;
