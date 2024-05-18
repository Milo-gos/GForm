import React from 'react';
import style from './signin.module.scss';
import classNames from 'classnames/bind';
import { MyButton, TextInput } from '../../components';
import { Google, ImageSignin, Logo } from '../../assets/images';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

const SignInPage = () => {
    return (
        <div className={cx('wrapper')}>
            <h2>Đăng nhập</h2>
            <form className={cx('form')}>
                <TextInput placeholder="Email"></TextInput>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <TextInput placeholder="Mật khẩu"></TextInput>
                    <Link
                        to={'/forgot-password'}
                        className={cx('forgot-password')}
                    >
                        Quên mật khẩu
                    </Link>
                </div>
                <MyButton textButton="Đăng nhập" size="big"></MyButton>
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
