import React, { useState } from 'react';
import style from './mail-tab.module.scss';
import classNames from 'classnames/bind';
import { MyButton, NormalTextInput } from '../../../../components';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useShareWithEmailMutation } from '../../../../hooks/api-hooks/mutations';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import SharedUserInterface from '../../../../utils/interfaces/SharedUserInterface';

const cx = classNames.bind(style);

interface Props {
    setOpenModalShare?: React.Dispatch<React.SetStateAction<boolean>>;
}
const FormValueSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: 'Vui lòng nhập email',
        })
        .email('Vui lòng nhập đúng định dạng email'),
    title: z.string(),
    message: z.string(),
});

type FormValue = z.infer<typeof FormValueSchema>;
const MailTab = ({ setOpenModalShare }: Props) => {
    const location = useLocation();
    const [isEdit, setEdit] = useState<boolean>(false);
    const { id } = useParams();
    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        setEdit(value);
    };
    const handleClickCancel = () => {
        setOpenModalShare!(false);
    };
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<FormValue>({
        resolver: zodResolver(FormValueSchema),
    });
    const queryClient = useQueryClient();
    const ShareWithEmailMutation = useShareWithEmailMutation();
    const onSubmit = (data: FormValue) => {
        const linkEditSurvey = `${window.location.origin}/user-survey-management#shared`;
        const body = { ...data, isEdit, surveyId: id, linkEditSurvey };
        ShareWithEmailMutation.mutate(body, {
            onSuccess(data) {
                if (location.hash === '#setting') {
                    console.log(data);
                    queryClient.setQueryData([`getSharedUserSurvey_${id}`], (oldData: SharedUserInterface) => {
                        return oldData
                            ? {
                                  ...oldData,
                                  sharedUsers: [...oldData.sharedUsers!, data],
                              }
                            : oldData;
                    });
                }
                toast.success('Gửi lời mời thành công!');
                setEdit(false);
                reset({
                    email: '',
                    title: '',
                    message: '',
                });
            },
            onError(error: any) {
                console.log(error);
                setError('email', {
                    type: 'server',
                    message: error.response.data.message,
                });
            },
        });
    };
    return (
        <div className={cx('wrapper')}>
            <span style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px', display: 'block' }}>Email</span>

            <form className={cx('form')} id="formMail" onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('form-control')}>
                    <span className={cx('label')}>Đến</span>
                    <div>
                        <NormalTextInput
                            placeholder="Địa chỉ email"
                            style={{ padding: '2px 0px', marginTop: '6px' }}
                            name="email"
                            register={register}
                        />
                        <p
                            style={{
                                marginTop: '4px',
                                fontSize: '14px',
                                color: '#db4437',
                            }}>
                            {errors.email?.message}
                        </p>
                    </div>
                </div>
                <div className={cx('form-control')}>
                    <span className={cx('label')}>Tiêu đề</span>
                    <NormalTextInput
                        placeholder="Tiêu đề"
                        style={{ padding: '2px 0px', marginTop: '6px' }}
                        name="title"
                        register={register}
                    />
                </div>

                <div className={cx('form-control')}>
                    <span className={cx('label')}>Tin nhắn</span>
                    <NormalTextInput
                        placeholder="Tin nhắn"
                        style={{ padding: '2px 0px', marginTop: '6px' }}
                        name="message"
                        register={register}
                    />
                </div>
            </form>
            <FormControlLabel
                style={{ marginTop: '12px' }}
                control={
                    <Checkbox
                        onChange={(e) => handleChangeChecked(e)}
                        checked={isEdit}
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
            <div className={cx('bottom')}>
                <div>
                    <MyButton textButton="Hủy" noBackground onClick={handleClickCancel} />
                </div>
                <div>
                    <MyButton textButton="Gửi" type="submit" form="formMail" />
                </div>
            </div>
        </div>
    );
};

export default MailTab;
