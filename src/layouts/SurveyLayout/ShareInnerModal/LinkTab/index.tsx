import React from 'react';
import style from './linktab.module.scss';
import classNames from 'classnames/bind';
import { MyButton, NormalTextInput } from '../../../../components';
import { Checkbox, FormControlLabel } from '@mui/material';

const cx = classNames.bind(style);

interface Props {
    setOpenModalShare?: React.Dispatch<React.SetStateAction<boolean>>;
}
const LinkTab = ({ setOpenModalShare }: Props) => {
    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
    };
    const handleClickCancel = () => {
        setOpenModalShare!(false);
    };
    return (
        <div className={cx('wrapper')}>
            <span style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px', display: 'block' }}>
                Liên kết
            </span>

            <form className={cx('form')}>
                <div className={cx('form-control')}>
                    <NormalTextInput placeholder="Liên kết" style={{ padding: '2px 0px', marginTop: '6px' }} />
                </div>
            </form>

            <div className={cx('bottom')}>
                <div>
                    <MyButton textButton="Hủy" noBackground onClick={handleClickCancel} />
                </div>
                <div>
                    <MyButton textButton="Sao chép" />
                </div>
            </div>
        </div>
    );
};

export default LinkTab;
