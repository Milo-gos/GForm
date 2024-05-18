import React from 'react';
import style from './signup.module.scss';
import classNames from 'classnames/bind';
import { MyButton, TextInput } from '../../components';
import { Google, ImageSignin, Logo } from '../../assets/images';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

const SignUpPage = () => {
    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('left-side')}>
                <div className={cx('app')}>
                    <div className={cx('logo-container')}>
                        <img className={cx('logo')} src={Logo}></img>
                    </div>
                    <span>GSurvey</span>
                </div>

                <img className={cx('imageSignup')} src={ImageSignin}></img>
            </div>
            <div className={cx('right-side')}>
                <div className={cx('inner')}>
                    <div className={cx('body')}>
                       
                    </div>
                </div>
            </div> */}

            <h2>Đăng ký</h2>
            <form className={cx('form')}>
                <TextInput placeholder="Họ và tên"></TextInput>
                <TextInput placeholder="Email"></TextInput>
                <TextInput placeholder="Mật khẩu"></TextInput>
                <TextInput placeholder="Nhập lại mật khẩu"></TextInput>
                <MyButton textButton="Đăng ký" size="big"></MyButton>
            </form>

            <div className={cx('confirm-have-account')}>
                <span>Bạn đã có tài khoản?</span>
                <Link to={'/signin'}>Đăng nhập</Link>
            </div>
        </div>
    );
};

export default SignUpPage;
