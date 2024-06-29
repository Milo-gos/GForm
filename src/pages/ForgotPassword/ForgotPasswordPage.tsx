import React, { useEffect, useRef, useState } from 'react';
import style from './forgotpassword.module.scss';
import classNames from 'classnames/bind';
import { ErrorMessage, MyButton, NormalTextInput } from '../../components';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../redux';
import useCheckExistEmailMutation from './mutation/checkExistEmail';
import { setLoading } from '../../redux/slice/global';
import { useTranslation } from 'react-i18next';
import i18n from '../../config/i18n';
const cx = classNames.bind(style);

const object = z.object({
    email: z
        .string()
        .min(1, {
            message: i18n.t('validation:email.please_enter_your_email'),
        })
        .email(i18n.t('validation:email.please_enter_valid_email_format')),
});

const ForgotPasswordPage = () => {
    const dispatchApp = useAppDispatch();
    const { t } = useTranslation('auth');
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
        <div className={cx('wrapper', 'responsive')}>
            <h2>{t('forgot_password')}</h2>
            <form className={cx('form')} onSubmit={handleSubmit(onsubmit)}>
                <div>
                    <NormalTextInput placeholder={t('email')} name="email" register={register}></NormalTextInput>
                    <ErrorMessage message={errors.email?.message} />
                </div>

                {showNotification && (
                    <p style={{ textAlign: 'center' }}>
                        {t('password_reset_link_sent')} <span>{`${minute}:${second}`}</span>
                    </p>
                )}
                {!showNotification && <MyButton textButton={t('continue')} size="big"></MyButton>}
            </form>
            <div className={cx('back-login')}>
                <Link to={'/signin'}>{t('back_to_login')}</Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
