import React, { useState } from 'react';
import style from './responsesurvey.module.scss';
import classNames from 'classnames/bind';
import { FormControlLabel, IconButton, Menu, MenuItem, Switch } from '@mui/material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Question, Response } from '../../components';
import QuestionType from '../../utils/interfaces/questionType';
const cx = classNames.bind(style);

const ResponseSurveyPage = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isOpening, setOpening] = useState(true);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isOpening = event.target.checked;
        setOpening(isOpening);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className={cx('total-response')}>34 phản hồi</span>

                    <IconButton style={{ padding: '8px' }} onClick={handleClick}>
                        <BsThreeDotsVertical size={24} />
                    </IconButton>

                    <Menu
                        disablePortal={true}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}>
                        <MenuItem onClick={handleClose}>Mô tả</MenuItem>
                        <MenuItem onClick={handleClose}>Kiểm tra định dạng</MenuItem>
                        <MenuItem onClick={handleClose}>Đi đến phần chỉ định dựa vào câu trả lời</MenuItem>
                    </Menu>
                </div>
                <div
                    className={cx('close-response', {
                        isClosed: isOpening === false,
                    })}>
                    <div>
                        <FormControlLabel
                            control={
                                <Switch
                                    color="warning"
                                    sx={{ color: 'error' }}
                                    checked={isOpening}
                                    onChange={handleSwitch}></Switch>
                            }
                            labelPlacement="start"
                            label={
                                <span className={cx('label-switch')}>
                                    {isOpening ? 'Đang nhận phản hồi' : 'Đã ngừng nhận phản hồi'}
                                </span>
                            }
                        />
                    </div>
                </div>
            </div>

            <Response questionType={QuestionType.ShortAnswer} />
            <Response questionType={QuestionType.Paragraph} />
            <Response questionType={QuestionType.RadioButton} />
            <Response questionType={QuestionType.Dropdown} />
        </div>
    );
};

export default ResponseSurveyPage;
