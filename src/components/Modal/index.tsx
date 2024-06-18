import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import style from './modal.module.scss';
import classNames from 'classnames/bind';
import { IconButton } from '@mui/material';

const cx = classNames.bind(style);
interface Props {
    children: JSX.Element;
    onClickClose: () => void;
}
const Modal = ({ children, onClickClose }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {children}
                <IconButton className={cx('icon-close')} onClick={onClickClose}>
                    <CloseIcon style={{ fontSize: '28px', fontWeight: '500' }} />
                </IconButton>
            </div>
        </div>
    );
};

export default Modal;
