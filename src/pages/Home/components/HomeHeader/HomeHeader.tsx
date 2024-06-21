import React from 'react';

import style from './homeheader.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Logo } from '../../../../assets/images';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import stringAvatar from '../../../../utils/stringAvatar';
import { getCurrentUser } from '../../../../API/axios';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const cx = classNames.bind(style);

const HomeHeader = () => {
    const token = localStorage.getItem('accessToken') || false;
    const { t } = useTranslation('home');
    const navigate = useNavigate();
    const { data: user } = useQuery({
        queryKey: [`getCurrentUser`],
        queryFn: getCurrentUser,
        refetchOnWindowFocus: false,
        enabled: !!token,
    });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickLogout = () => {
        setAnchorEl(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/', {
            replace: true,
        });
    };

    return (
        <div className={cx('wrapper', 'responsive')}>
            <div className={cx('inner')}>
                <div className={cx('logo-wrapper')}>
                    <img className={cx('logo')} src={Logo}></img>
                    <span className={cx('app-name')}>GSurvey</span>
                </div>
                <div className={cx('group')}>
                    <div className={cx('nav-list')}>
                        {token && (
                            <div className={cx('create-survey')}>
                                <Link to={'/user-survey-management'}>{t('header.survey_management')}</Link>
                            </div>
                        )}

                        {!token ? (
                            <>
                                <div className={cx('sign-in')}>
                                    <Link to="/signin">{t('header.sign_in')}</Link>
                                </div>
                                <div className={cx('sign-up')}>
                                    <Link to="/signup">{t('header.Sign_up')}</Link>
                                </div>
                            </>
                        ) : (
                            <div className={cx('user-section')}>
                                <span className={cx('user-name')}>{user?.fullName}</span>
                                <IconButton style={{ padding: '1px' }} onClick={handleClick}>
                                    <div className={cx('avatar')}>
                                        {user?.avatar ? (
                                            <Avatar
                                                src={user?.avatar}
                                                sx={{ width: '100%', height: '100%' }}
                                                className={cx('img')}
                                            />
                                        ) : (
                                            <Avatar
                                                {...stringAvatar(user?.fullName || '')}
                                                sx={{ width: '100%', height: '100%' }}
                                                className={cx('img')}
                                            />
                                        )}
                                    </div>
                                </IconButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Menu
                disablePortal={true}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                <MenuItem onClick={handleClickLogout}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                        <LogoutOutlinedIcon />
                        <span>Đăng xuất</span>
                    </div>
                </MenuItem>
                <MenuItem onClick={() => navigate('/user-survey-management')} className={cx('menu-item-management')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                        <ManageSearchIcon />
                        <span>{t('header.survey_management')}</span>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default HomeHeader;
