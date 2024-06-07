import React from 'react';
import style from './mailtab.module.scss';
import classNames from 'classnames/bind';
import { MyButton, NormalTextInput } from '../../../../components';
import { Checkbox, FormControlLabel } from '@mui/material';

const cx = classNames.bind(style);

interface Props {
    setOpenModalShare?: React.Dispatch<React.SetStateAction<boolean>>;
}
const MailTab = ({ setOpenModalShare }: Props) => {
    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
    };
    const handleClickCancel = () => {
        setOpenModalShare!(false);
    };
    return (
        <div className={cx('wrapper')}>
            <span style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px', display: 'block' }}>Email</span>

            <form className={cx('form')}>
                <div className={cx('form-control')}>
                    <span className={cx('label')}>Đến</span>
                    <NormalTextInput placeholder="Địa chỉ email" style={{ padding: '2px 0px', marginTop: '6px' }} />
                </div>
                <div className={cx('form-control')}>
                    <span className={cx('label')}>Tiêu đề</span>
                    <NormalTextInput placeholder="Địa chỉ email" style={{ padding: '2px 0px', marginTop: '6px' }} />
                </div>

                <div className={cx('form-control')}>
                    <span className={cx('label')}>Tin nhắn</span>
                    <NormalTextInput placeholder="Địa chỉ email" style={{ padding: '2px 0px', marginTop: '6px' }} />
                </div>
            </form>
            <FormControlLabel
                style={{ marginTop: '12px' }}
                control={
                    <Checkbox
                        onChange={(e) => handleChangeChecked(e)}
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
                    <MyButton textButton="Gửi" />
                </div>
            </div>
        </div>
    );
};

export default MailTab;
