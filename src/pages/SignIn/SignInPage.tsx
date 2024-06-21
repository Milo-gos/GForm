import React, { useEffect } from 'react';
import style from './signin.module.scss';
import { z } from 'zod';
import classNames from 'classnames/bind';
import { ErrorMessage, MyButton, NormalTextInput } from '../../components';
import { Google } from '../../assets/images';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAppDispatch } from '../../redux';
import useSignInMutation from './mutation/signIn';
import { setLoading } from '../../redux/slice/global';
import useSignInGoogleMutation from './mutation/signInGoogle';
import { auth, provider } from '../../utils/firebase/config';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/i18n';

const cx = classNames.bind(style);

const SignInSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: i18n.t('validation:email.please_enter_your_email'),
        })
        .email(i18n.t('validation:email.please_enter_valid_email_format')),
    password: z
        .string()
        .min(1, {
            message: i18n.t('validation:password.please_enter_password'),
        })
        .min(6, i18n.t('validation:password.password_must_be_at_least_6_characters_long')),
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

const SignInPage = () => {
    const { t } = useTranslation('auth');
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

    const saveToken = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('accessToken', accessToken!);
        localStorage.setItem('refreshToken', refreshToken!);
    };
    const SignInMutation = useSignInMutation();
    const onbsumit = async (user: SignInSchemaType) => {
        dispatchApp(setLoading(true));
        SignInMutation.mutate(user, {
            onSuccess(data) {
                dispatchApp(setLoading(false));
                saveToken(data.accessToken, data.refreshToken);
                navigate('/', {
                    replace: true,
                });
            },
            onError(error: any) {
                dispatchApp(setLoading(false));
                setError('password', {
                    type: 'server',
                    message: error.response.data.message,
                });
            },
        });
    };
    const SignInGoogleMutation = useSignInGoogleMutation();
    const handleClickSignInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        const tokenFirebase = await result.user.getIdToken();
        SignInGoogleMutation.mutate(tokenFirebase, {
            onSuccess(data) {
                saveToken(data.accessToken, data.refreshToken);
                navigate('/', {
                    replace: true,
                });
            },
            onError() {
                toast.error(i18n.t('notificationMessage:error.an_error_occurred'));
            },
        });
    };
    return (
        <div className={cx('wrapper', 'responsive')}>
            <h2>{t('sign_in')}</h2>
            <form className={cx('form')} onSubmit={handleSubmit(onbsumit)}>
                <div>
                    <NormalTextInput placeholder={t('email')} name="email" register={register}></NormalTextInput>

                    <ErrorMessage message={errors.email?.message} />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <div>
                        <NormalTextInput
                            placeholder={t('password')}
                            name="password"
                            typePassword={true}
                            register={register}></NormalTextInput>
                        <ErrorMessage message={errors.password?.message} />
                    </div>
                    <Link to={'/forgot-password'} className={cx('forgot-password')}>
                        {t('forgot_password')}
                    </Link>
                </div>
                <MyButton textButton={t('sign_in')} size="big" type="submit"></MyButton>
            </form>
            <div className={cx('separate')}>
                <div></div>
                <span>{t('or')}</span>
                <div></div>
            </div>
            <div className={cx('login-google')} onClick={handleClickSignInWithGoogle}>
                <img src={Google} />
                <span>{t('sign_in_with_google')}</span>
            </div>

            <div className={cx('confirm-not-have-account')}>
                <span>{t('do_you_have_an_account')}</span>

                <Link to={'/signup'}>{t('sign_up')}</Link>
            </div>
        </div>
    );
};

export default SignInPage;
