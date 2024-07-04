import React, { useEffect, useState } from 'react';
import style from './usm-header.module.scss';
import classNames from 'classnames/bind';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDebounce } from 'react-autosave';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../../assets/images';
import { LanguageButton, Search } from '../../../../components';
import { useAppDispatch } from '../../../../redux/store';
import { setSearchString } from '../../../../redux/slice/surveyManagement';
import stringAvatar from '../../../../utils/string-avatar';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../config/firebase';
import { useTranslation } from 'react-i18next';
import { useGetCurrentUserQuery } from '../../../../hooks/api-hooks/queries';

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
        await signOut(auth);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAnchorEl(null);
        navigate('/signin', {
            replace: true,
        });
    };

    const { data: user } = useGetCurrentUserQuery();
    if (!user) return <></>;

    return (
        <div className={cx('wrapper', 'responsive')}>
            <div className={cx('header-wrapper')}>
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
                        <span>{user?.fullName}</span>
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
            </div>

            <div className={cx('search-wrapper-2')}>
                <Search placeHolder={t('search_surveys')} onChange={(e) => setSearch(e.target.value)} />
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
