import React, { useEffect, useState } from 'react';
import style from './usmheader.module.scss';
import classNames from 'classnames/bind';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'react-autosave';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../../assets/images';
import { getCurrentUser } from '../../../../API/axios';
import { LanguageButton, Search } from '../../../../components';
import { useAppDispatch } from '../../../../redux';
import { setSearchString } from '../../../../redux/slice/surveyManagement';
import stringAvatar from '../../../../utils/stringAvatar';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../utils/firebase/config';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);

const USMHeader = () => {
    const { t } = useTranslation('surveyManagement');
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatchApp = useAppDispatch();
    const open = Boolean(anchorEl);
    const [search, setSearch] = useState('');
    const debouncedSearchString = useDebounce(search, 400);

    useEffect(() => {
        dispatchApp(setSearchString(debouncedSearchString));
    }, [debouncedSearchString]);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickSetting = () => {
        setAnchorEl(null);
        navigate('/my-profile');
    };
    const handleClickLogout = async () => {
        setAnchorEl(null);
        await signOut(auth);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/signin', {
            replace: true,
        });
    };

    const { data: user } = useQuery({
        queryKey: [`getCurrentUser`],
        queryFn: getCurrentUser,
        refetchOnWindowFocus: false,
    });

    if (!user) return <></>;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-wrapper')} onClick={() => navigate('/')}>
                <img className={cx('logo')} src={Logo}></img>
                <span>GSurvey</span>
            </div>
            <div className={cx('search-wrapper')}>
                <Search placeHolder={t('search_surveys')} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LanguageButton />
                <div className={cx('user-info-wrapper')}>
                    <span style={{ fontSize: '18px', fontWeight: '500' }}>{user?.fullName}</span>
                    <IconButton style={{ padding: '1px' }} onClick={handleClick}>
                        <div className={cx('avatar')}>
                            {user?.avatar ? (
                                <Avatar src={user?.avatar} sx={{ width: '100%', height: '100%' }} />
                            ) : (
                                <Avatar
                                    {...stringAvatar(user?.fullName || '')}
                                    sx={{ width: '100%', height: '100%' }}
                                />
                            )}
                        </div>
                    </IconButton>
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
                <MenuItem onClick={handleClickSetting}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                        <ManageAccountsOutlinedIcon />
                        <span>{t('account_setting')}</span>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClickLogout}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                        <LogoutOutlinedIcon />
                        <span>{t('sign_out')}</span>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default USMHeader;
