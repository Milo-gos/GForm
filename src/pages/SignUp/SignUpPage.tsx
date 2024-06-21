import React, { useEffect, useRef, useState } from 'react';
import style from './signup.module.scss';
import classNames from 'classnames/bind';
import { ErrorMessage, MyButton, NormalTextInput } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import useSignUpMutation from './mutation/signUp';
import { setLoading } from '../../redux/slice/global';
import { useTranslation } from 'react-i18next';
import i18n from '../../config/i18n';
const cx = classNames.bind(style);

const SignUpSchema = z
    .object({
        fullName: z.string().min(1, {
            message: i18n.t('validation:fullname.enter_full_name'),
        }),
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
        confirmPassword: z
            .string()
            .min(1, {
                message: i18n.t('validation:password.please_enter_password'),
            })
            .min(6, i18n.t('validation:password.password_must_be_at_least_6_characters_long')),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: i18n.t('validation:password.password_does_not_match'),
        path: ['confirmPassword'],
    });

type SignUpSchemaType = z.infer<typeof SignUpSchema>;
const SignUpPage = () => {
    const { t } = useTranslation('auth');
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
    const SignUpMutation = useSignUpMutation();
    const onbsumit = async (user: SignUpSchemaType) => {
        dispatchApp(setLoading(true));
        SignUpMutation.mutate(user, {
            onSuccess() {
                handleSignUpSuccessfully();
                dispatchApp(setLoading(false));
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
    useEffect(() => {
        return () => {
            clearInterval(refId.current);
        };
    }, []);

    return (
        <div className={cx('wrapper', 'responsive')}>
            {result !== 'success' ? (
                <>
                    <h2>{t('sign_up')}</h2>
                    <form className={cx('form')} onSubmit={handleSubmit(onbsumit)}>
                        <div>
                            <NormalTextInput
                                placeholder={t('full_name')}
                                name="fullName"
                                register={register}></NormalTextInput>
                            <ErrorMessage message={errors.fullName?.message} />
                        </div>
                        <div>
                            <NormalTextInput
                                placeholder={t('email')}
                                name="email"
                                register={register}></NormalTextInput>
                            <ErrorMessage message={errors.email?.message} />
                        </div>

                        <div>
                            <NormalTextInput
                                placeholder={t('password')}
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
                        <MyButton textButton={t('sign_up')} size="big" type="submit"></MyButton>
                    </form>

                    <div className={cx('confirm-have-account')}>
                        <span>{t('you_have_an_account')}</span>
                        <Link to={'/signin'}>{t('sign_in')}</Link>
                    </div>
                </>
            ) : (
                <>
                    <h2>{t('verify_email')}</h2>
                    <div style={{ textAlign: 'center' }}>
                        <MdOutlineMarkEmailRead size={100} />
                    </div>
                    <p style={{ textAlign: 'center' }}>
                        {t('verify_email_link_sent')} <span>{`${minute}:${second}`}</span>
                    </p>
                    <div className={cx('back-login')} style={{ textAlign: 'center', marginTop: '48px' }}>
                        <Link to={'/signin'}>{t('back_to_login')}</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default SignUpPage;
