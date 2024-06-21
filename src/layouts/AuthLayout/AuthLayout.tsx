import React, { ReactElement } from 'react';
import style from './authlayout.module.scss';
import classNames from 'classnames/bind';
import { ImageSignin, Logo } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);

const AuthLayout = ({ children }: { children?: JSX.Element }) => {
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper', 'responsive')}>
            <div className={cx('left-side')}>
                <div className={cx('app')} onClick={() => navigate('/')}>
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
