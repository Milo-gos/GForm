import React, { useEffect, useState } from 'react';
import { Logo } from '../../../assets/images';
import style from './header.module.scss';
import classNames from 'classnames/bind';
import Search from '../../../components/Search';
import { IconButton, Menu, MenuItem } from '@mui/material';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../utils/API/axios';
import { useDebounce } from 'react-autosave';
import { useAppDispatch } from '../../../redux';
import { setSearchString } from '../../../redux/slice/surveyManagement';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

const Header = () => {
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
    const handleClickLogout = () => {
        setAnchorEl(null);
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-wrapper')}>
                <img className={cx('logo')} src={Logo}></img>
                <span>GSurvey</span>
            </div>
            <div className={cx('search-wrapper')}>
                <Search placeHolder="Tìm kiếm khảo sát" onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: '500' }}>{user?.fullName}</span>
                <IconButton style={{ padding: '1px' }} onClick={handleClick}>
                    <div className={cx('account-wrapper')}>
                        <div className={cx('avatar')}>
                            <img src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" />
                        </div>
                    </div>
                </IconButton>
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
                        <span>Cài đặt tài khoản</span>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClickLogout}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                        <LogoutOutlinedIcon />
                        <span>Đăng xuất</span>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Header;
