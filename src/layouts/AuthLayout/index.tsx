import React, { ReactElement } from 'react';
import style from './authlayout.module.scss';
import classNames from 'classnames/bind';
import { MyButton, TextInput } from '../../components';
import { ImageSignin, Logo } from '../../assets/images';
const cx = classNames.bind(style);

const AuthLayout = ({ children }: { children?: JSX.Element }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-side')}>
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
                    <div className={cx('body')}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
