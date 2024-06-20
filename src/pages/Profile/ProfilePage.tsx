import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import style from './profile.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { ErrorMessage, MyButton, NormalTextInput } from '../../components';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import useChangeUserAvatarMutation from './mutation/changeUserAvatar';
import { MoonLoader } from 'react-spinners';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../../API/axios';
import UserInterface from '../../utils/interfaces/user';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useChangeUsernameMutation from './mutation/changeUsername';
import useChangeUserPasswordMutation from './mutation/changeUserPassword';
import { useAppDispatch } from '../../redux';
import { setLoading } from '../../redux/slice/global';
import { Link, useNavigate } from 'react-router-dom';
import stringAvatar from '../../utils/stringAvatar';
import useSetUserPasswordMutation from './mutation/setUserPassword';

const cx = classNames.bind(style);
const ChangePassWordSchema = z
    .object({
        password: z
            .string()
            .min(1, {
                message: 'Vui lòng nhập mật khẩu',
            })
            .min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
        newPassword: z
            .string()
            .min(1, {
                message: 'Vui lòng nhập mật khẩu',
            })
            .min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
        confirmNewPassword: z
            .string()
            .min(1, {
                message: 'Vui lòng nhập mật khẩu',
            })
            .min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Mật khẩu mới không trùng khớp',
        path: ['confirmNewPassword'],
    });

const SetPassWordSchema = z
    .object({
        setNewPassword: z
            .string()
            .min(1, {
                message: 'Vui lòng nhập mật khẩu',
            })
            .min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
        confirmSetNewPassword: z
            .string()
            .min(1, {
                message: 'Vui lòng nhập mật khẩu',
            })
            .min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
    })
    .refine((data) => data.setNewPassword === data.confirmSetNewPassword, {
        message: 'Mật khẩu mới không trùng khớp',
        path: ['confirmSetNewPassword'],
    });
const ChangeUserNameSchema = z.object({
    fullName: z.string().min(1, {
        message: 'Vui lòng nhập tên',
    }),
});
type ChangePassWordType = z.infer<typeof ChangePassWordSchema>;
type SetPassWordType = z.infer<typeof SetPassWordSchema>;
type ChangeNameType = z.infer<typeof ChangeUserNameSchema>;

const ProfilePage = () => {
    const dispatchApp = useAppDispatch();
    const navigate = useNavigate();
    const [isChangePassword, setChangePassword] = useState(false);
    const [isChangeName, setChangeName] = useState(false);
    const [isLoadAvatar, setLoadAvatar] = useState(false);
    const queryClient = useQueryClient();
    const { data: user } = useQuery({
        queryKey: [`getCurrentUser`],
        queryFn: getCurrentUser,
        refetchOnWindowFocus: false,
    });
    const ref = useRef<HTMLInputElement>(null);
    const ChangeUserAvatarMutation = useChangeUserAvatarMutation();
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement).files;
        if (files?.[0]) {
            const formData = new FormData();
            formData.append('file', files[0]);
            if (user?.avatar) formData.append('avatar', user?.avatar ?? '');
            setLoadAvatar(true);
            ChangeUserAvatarMutation.mutate(formData, {
                onSuccess(data) {
                    queryClient.setQueryData(['getCurrentUser'], (oldData: UserInterface) => {
                        return oldData
                            ? {
                                  ...oldData,
                                  avatar: data,
                              }
                            : oldData;
                    });

                    setLoadAvatar(false);
                    toast.success('Cập nhật ảnh đại diện thành công');
                },
                onError() {
                    setLoadAvatar(false);
                },
            });
        }
    };

    const {
        setValue: setValueName,
        register: registerName,
        getValues: getValuesName,
        formState: { errors: errorsName },
    } = useForm<ChangeNameType>({
        resolver: zodResolver(ChangeUserNameSchema),
        mode: 'all',
        shouldFocusError: true,
    });

    const {
        setError: setErrorPassword,
        register: registerPassword,
        handleSubmit: handleSubmitChangePassword,
        reset: resetPassword,
        formState: { errors: errorPassword },
    } = useForm<ChangePassWordType>({
        resolver: zodResolver(ChangePassWordSchema),
        mode: 'onSubmit',
        shouldFocusError: true,
    });

    const {
        setError: setErrorSetPassword,
        register: registerSetPassword,
        handleSubmit: handleSubmitSetPassword,
        reset: resetSetPassword,
        formState: { errors: errorSetPassword },
    } = useForm<SetPassWordType>({
        resolver: zodResolver(SetPassWordSchema),
        mode: 'onSubmit',
        shouldFocusError: true,
    });

    const UseChangePasswordMutation = useChangeUserPasswordMutation();
    const UseSetUserPassword = useSetUserPasswordMutation();
    const submitPassword = (data: ChangePassWordType) => {
        dispatchApp(setLoading(true));
        UseChangePasswordMutation.mutate(
            {
                newPassword: data.newPassword,
                currentPassword: data.password,
            },
            {
                onSuccess(data) {
                    dispatchApp(setLoading(false));
                    toast.success('Đổi mật khẩu thành công');
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    resetPassword({
                        password: '',
                        newPassword: '',
                        confirmNewPassword: '',
                    });
                    setChangePassword(false);
                },
                onError(error: any) {
                    dispatchApp(setLoading(false));
                    setErrorPassword('password', {
                        type: 'server',
                        message: error.response.data.message,
                    });
                },
            },
        );
    };
    const submitSetPassword = (data: SetPassWordType) => {
        dispatchApp(setLoading(true));
        UseSetUserPassword.mutate(
            {
                newPassword: data.setNewPassword,
            },
            {
                onSuccess(data) {
                    dispatchApp(setLoading(false));
                    toast.success('Đổi mật khẩu thành công');
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    resetPassword({
                        password: '',
                        newPassword: '',
                        confirmNewPassword: '',
                    });
                    setChangePassword(false);
                },
                onError(error: any) {
                    dispatchApp(setLoading(false));
                    setErrorPassword('password', {
                        type: 'server',
                        message: error.response.data.message,
                    });
                },
            },
        );
    };

    const UseChangeUserNameMutation = useChangeUsernameMutation();

    const handleClickChangeName = () => {
        if (errorsName.fullName?.message) return;
        dispatchApp(setLoading(true));
        UseChangeUserNameMutation.mutate(
            { fullName: getValuesName('fullName') },
            {
                onSuccess() {
                    dispatchApp(setLoading(false));
                    toast.success('Đổi tên thành công');
                    setChangeName(false);
                },
                onError() {
                    dispatchApp(setLoading(false));
                },
            },
        );
    };
    useEffect(() => {
        if (user?.fullName) {
            setValueName('fullName', user.fullName);
        }
    }, [user]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    {user?.avatar ? (
                        <Avatar src={user?.avatar} sx={{ width: '100%', height: '100%' }} />
                    ) : (
                        <Avatar {...stringAvatar(user?.fullName || '')} sx={{ width: '100%', height: '100%' }} />
                    )}
                    <div className={cx('edit-wrapper')} onClick={() => ref.current?.click()}>
                        {!isLoadAvatar ? (
                            <>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className={cx('input-image')}
                                    ref={ref}
                                    onChange={handleChangeImage}
                                />
                                <EditIcon className={cx('icon')} />
                            </>
                        ) : (
                            <MoonLoader color="#fff" size={15} />
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('section')}>
                    <div className={cx('section-header')}>
                        <div className={cx('separate')}></div>
                        <span className={cx('title')}>THÔNG TIN</span>
                        <div className={cx('separate')}></div>
                    </div>

                    <div className={cx('field')}>
                        <div className={cx('label')}>Họ và tên</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '60%' }}>
                                <NormalTextInput
                                    style={{ padding: '6px 0' }}
                                    name="fullName"
                                    register={registerName}
                                    disabled={!isChangeName}
                                    isFocus={isChangeName}
                                />
                            </div>

                            <Tooltip title="Thay đổi">
                                <IconButton onClick={() => setChangeName(true)}>
                                    <EditIcon className={cx('icon')} />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <ErrorMessage message={errorsName.fullName?.message} />

                        {isChangeName && (
                            <div className={cx('buttons-wrapper')}>
                                <MyButton textButton="Hủy" onClick={() => setChangeName(false)} />
                                <MyButton textButton="Lưu" onClick={handleClickChangeName} />
                            </div>
                        )}
                    </div>

                    <div className={cx('field')}>
                        <div className={cx('label')}>Địa chỉ email</div>
                        <div style={{ width: '60%' }}>
                            <NormalTextInput style={{ padding: '6px 0' }} disabled value={user?.email} />
                        </div>
                    </div>
                </div>

                <div className={cx('section')}>
                    <div className={cx('section-header')}>
                        <div className={cx('separate')}></div>
                        <span className={cx('title')}>CÀI ĐẶT</span>
                        <div className={cx('separate')}></div>
                    </div>

                    <div className={cx('field')}>
                        {!isChangePassword && (
                            <>
                                <div className={cx('label')}>Mật khẩu</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '60%' }}>
                                        <NormalTextInput
                                            style={{ padding: '6px 0', fontWeight: '300' }}
                                            value={'●●●●●●●●●'}
                                            disabled
                                        />
                                    </div>
                                    <Tooltip title="Thay đổi">
                                        <IconButton onClick={() => setChangePassword(true)}>
                                            <EditIcon className={cx('icon')} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </>
                        )}
                        {isChangePassword && !user?.isGoogleAccount && (
                            <>
                                <form
                                    className={cx('section')}
                                    onSubmit={handleSubmitChangePassword(submitPassword)}
                                    id="formChangePassword">
                                    <div className={cx('field')}>
                                        <div className={cx('label')}>Mật khẩu hiện tại</div>
                                        <div style={{ width: '60%' }}>
                                            <NormalTextInput
                                                typePassword={true}
                                                style={{ padding: '6px 0' }}
                                                isFocus={isChangePassword}
                                                register={registerPassword}
                                                name="password"
                                            />
                                            <ErrorMessage message={errorPassword.password?.message} />
                                        </div>
                                    </div>
                                    <div className={cx('field')}>
                                        <div className={cx('label')}>Mật khẩu mới</div>
                                        <div style={{ width: '60%' }}>
                                            <NormalTextInput
                                                typePassword={true}
                                                style={{ padding: '6px 0' }}
                                                register={registerPassword}
                                                name="newPassword"
                                            />

                                            <ErrorMessage message={errorPassword.newPassword?.message} />
                                        </div>
                                    </div>
                                    <div className={cx('field')}>
                                        <div className={cx('label')}>Nhập lại mật khẩu mới</div>
                                        <div style={{ width: '60%' }}>
                                            <NormalTextInput
                                                typePassword={true}
                                                style={{ padding: '6px 0' }}
                                                register={registerPassword}
                                                name="confirmNewPassword"
                                            />

                                            <ErrorMessage message={errorPassword.confirmNewPassword?.message} />
                                        </div>
                                    </div>
                                </form>
                                {isChangePassword && (
                                    <div className={cx('buttons-wrapper')}>
                                        <MyButton textButton="Hủy" onClick={() => setChangePassword(false)} />
                                        <MyButton textButton="Lưu" form="formChangePassword" />
                                    </div>
                                )}
                            </>
                        )}

                        {isChangePassword && user?.isGoogleAccount && (
                            <>
                                <form
                                    className={cx('section')}
                                    onSubmit={handleSubmitSetPassword(submitSetPassword)}
                                    id="formSetPassword">
                                    <div className={cx('field')}>
                                        <div className={cx('label')}>Mật khẩu mới</div>
                                        <div style={{ width: '60%' }}>
                                            <NormalTextInput
                                                typePassword={true}
                                                style={{ padding: '6px 0' }}
                                                register={registerSetPassword}
                                                name="setNewPassword"
                                            />
                                            <ErrorMessage message={errorSetPassword.setNewPassword?.message} />
                                        </div>
                                    </div>
                                    <div className={cx('field')}>
                                        <div className={cx('label')}>Nhập lại mật khẩu mới</div>
                                        <div style={{ width: '60%' }}>
                                            <NormalTextInput
                                                typePassword={true}
                                                style={{ padding: '6px 0' }}
                                                register={registerSetPassword}
                                                name="confirmSetNewPassword"
                                            />

                                            <ErrorMessage message={errorSetPassword.confirmSetNewPassword?.message} />
                                        </div>
                                    </div>
                                </form>
                                {isChangePassword && (
                                    <div className={cx('buttons-wrapper')}>
                                        <MyButton textButton="Hủy" onClick={() => setChangePassword(false)} />
                                        <MyButton textButton="Lưu" form="formSetPassword" />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div onClick={() => navigate(-1)} className={cx('back')}>
                Quay về
            </div>
        </div>
    );
};

export default ProfilePage;
