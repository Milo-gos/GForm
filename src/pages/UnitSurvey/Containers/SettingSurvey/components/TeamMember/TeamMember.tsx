import classNames from 'classnames/bind';

import styles from './teammember.module.scss';
import { useState } from 'react';

import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Checkbox, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import { MyLabel } from '../../../../../../components';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import useChangeEditSharedUserMutation from '../../../../mutation/changeEditSharedUser';
import { useParams } from 'react-router-dom';
import SharedUserInterface from '../../../../../../utils/interfaces/sharedUserInterface';
import useDeleteSharedUserMutation from '../../../../mutation/deleteSharedUser copy';
import stringAvatar from '../../../../../../utils/functions/stringAvatar';
import { useAppDispatch } from '../../../../../../redux';
import { setOpenSnackbar } from '../../../../../../redux/slice/global';

const cx = classNames.bind(styles);

interface Props {
    owner?: {
        avatar?: string;
        email: string;
        fullName: string;
        id: string;
    };
    sharedUser?: {
        avatar?: string;
        email: string;
        fullName: string;
        userId: string;
        sharedId: string;
        isAccept: boolean;
        isEdit: boolean;
    };
    isOwner: boolean;
    surveyId: string;
}
function TeamMember({ owner, sharedUser, isOwner, surveyId }: Props) {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const user = owner || sharedUser;
    const dispatchApp = useAppDispatch();
    const ChangeEditSharedUserMutation = useChangeEditSharedUserMutation();
    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isOwner) return;
        const value = event.target.checked;
        ChangeEditSharedUserMutation.mutate(
            {
                sharedId: sharedUser?.sharedId,
                isEdit: value,
                surveyId: surveyId,
            },
            {
                onSuccess() {
                    queryClient.setQueryData([`getSharedUserSurvey_${id}`], (oldData: SharedUserInterface) => {
                        return oldData
                            ? {
                                  ...oldData,
                                  sharedUsers: oldData.sharedUsers?.map((item) => {
                                      if (item.sharedId === sharedUser?.sharedId) {
                                          return {
                                              ...item,
                                              isEdit: value,
                                          };
                                      } else return item;
                                  }),
                              }
                            : oldData;
                    });
                    if (value) {
                        dispatchApp(
                            setOpenSnackbar({
                                value: true,
                                message: 'Đã thêm quyền chỉnh sửa',
                            }),
                        );
                    } else {
                        dispatchApp(
                            setOpenSnackbar({
                                value: true,
                                message: 'Đã hủy quyền chỉnh sửa',
                            }),
                        );
                    }
                },
            },
        );
    };

    const DeleteSharedUserMutation = useDeleteSharedUserMutation();
    const handleClickRemoveSharedUser = () => {
        DeleteSharedUserMutation.mutate(
            {
                sharedId: sharedUser?.sharedId,
                surveyId,
            },
            {
                onSuccess() {
                    queryClient.setQueryData([`getSharedUserSurvey_${id}`], (oldData: SharedUserInterface) => {
                        return oldData
                            ? {
                                  ...oldData,
                                  sharedUsers: oldData.sharedUsers?.filter(
                                      (item) => item.sharedId !== sharedUser?.sharedId,
                                  ),
                              }
                            : oldData;
                    });
                    dispatchApp(
                        setOpenSnackbar({
                            value: true,
                            message: 'Đã xóa thành viên',
                        }),
                    );
                },
            },
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                {user?.avatar ? (
                    <Avatar src={user?.avatar} sx={{ width: 56, height: 56 }} />
                ) : (
                    <Avatar {...stringAvatar(user?.fullName || '')} sx={{ width: 56, height: 56 }} />
                )}

                <div>
                    <>
                        {!owner && (
                            <>
                                {!sharedUser?.isAccept && (
                                    <MyLabel size="normal" label="Chờ chấp nhận" textColor="rgb(104, 103, 95)" />
                                )}

                                {sharedUser?.isAccept && (
                                    <MyLabel
                                        size="normal"
                                        label="Đã chấp nhận"
                                        textColor="#fff"
                                        backgroundColor="#35ca97"
                                    />
                                )}
                            </>
                        )}
                    </>
                    <div style={{ marginTop: '8px' }}>{user?.fullName}</div>
                    <div>{user?.email} </div>

                    {!owner && (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={sharedUser?.isEdit}
                                    onChange={handleChangeChecked}
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        color: '#5c6468',
                                        '&.Mui-checked': {
                                            color: '#fcc934',
                                        },
                                    }}
                                />
                            }
                            label={'Chỉnh sửa'}
                        />
                    )}
                </div>
                {sharedUser && isOwner && (
                    <Tooltip title="Xóa thành viên">
                        <IconButton onClick={handleClickRemoveSharedUser}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </div>
    );
}

export default TeamMember;
