import React, { useEffect, useRef, useState } from 'react';
import style from './bottomquestion.module.scss';
import classNames from 'classnames/bind';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import TextInput from '../TextInput';
import { FormControlLabel, Switch } from '@mui/material';
import { BsThreeDotsVertical } from 'react-icons/bs';
const cx = classNames.bind(style);

const BottomQuestion = () => {
    return (
        <div className={cx('wrapper')}>
            <ContentCopyIcon style={{ cursor: 'pointer' }} />
            <DeleteIcon style={{ fontSize: '28px', cursor: 'pointer', marginLeft: '8px' }} />
            <div className={cx('divider')}></div>
            {/* <Switch defaultChecked /> */}
            <FormControlLabel
                control={<Switch defaultChecked color="warning"></Switch>}
                labelPlacement="start"
                label={<span style={{ fontSize: '14px' }}>Bắt buộc</span>}
            />
            <div className={cx('three-dot', 'item-toolbar')}>
                <BsThreeDotsVertical size={20} />
            </div>
        </div>
    );
};

export default BottomQuestion;
