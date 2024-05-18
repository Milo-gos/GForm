import React from 'react';
import style from './forgotpassword.module.scss';
import classNames from 'classnames/bind';
import { MyButton, TextInput } from '../../components';
import { Google, ImageSignin, Logo } from '../../assets/images';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

const ForgotPasswordPage = () => {
    return (
        <div className={cx('wrapper')}>
            <h2>Quên mật khẩu</h2>
            <form className={cx('form')}>
                <TextInput placeholder="Nhập email tài khoản"></TextInput>
                <MyButton textButton="Tiếp tục" size="big"></MyButton>
            </form>
            <div className={cx('back-login')}>
                <Link to={'/signin'}>Quay về đăng nhập</Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
