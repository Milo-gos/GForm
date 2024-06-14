import React, { useEffect, useRef, useState } from 'react';
import style from './sharedsurvey.module.scss';
import classNames from 'classnames/bind';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Tooltip } from '@mui/material';

const cx = classNames.bind(style);

interface SharedSurveyData {
    id: string;
    ownerName: string;
    ownerAvatar: string;
    title: string;
    description: string;
    isAccepting: boolean;
    questionsCount: number;
    responsesCount: number;
    create_at: string;
    isEdit: boolean;
}
interface Props {
    index?: number;
    sharedSurvey?: SharedSurveyData;
}
const SharedSurvey = ({ index, sharedSurvey }: Props) => {
    const navigate = useNavigate();
    const handleClickSharedSurvey = () => {
        navigate(`/surveys/${sharedSurvey?.id}/edit`);
    };
    return (
        <div
            className={cx('wrapper', {
                isAccepting: sharedSurvey?.isAccepting === true,
            })}
            onClick={handleClickSharedSurvey}>
            <div className={cx('title')}>
                <FeedOutlinedIcon className={cx('icon')} />
                <span>{sharedSurvey?.title}</span>
            </div>
            <div className={cx('separate')}></div>
            <div className={cx('question', 'col')}>
                <span>Số câu hỏi</span>
                <span className={cx('bold')}>{sharedSurvey?.questionsCount}</span>
            </div>
            <div className={cx('response', 'col')}>
                <span>Số lượng phản hồi</span>
                <span className={cx('bold')}>{sharedSurvey?.responsesCount}</span>
            </div>

            <div className={cx('status', 'col')}>
                <span>Trạng thái</span>
                <span className={cx('bold')}>
                    {sharedSurvey?.isAccepting ? 'Đang nhận phản hồi' : 'Ngừng nhận phản hồi'}
                </span>
            </div>

            <div className={cx('owner', 'col')}>
                <span>Người tạo</span>
                <Tooltip title={sharedSurvey?.ownerName}>
                    <div className={cx('avatar')}>
                        <img src={sharedSurvey?.ownerAvatar} />
                    </div>
                </Tooltip>
            </div>

            <div className={cx('col')}>
                <span>Quyền</span>
                <Tooltip title={sharedSurvey?.isEdit ? 'Chỉnh sửa' : 'Xem'}>
                    {sharedSurvey?.isEdit ? <EditIcon /> : <VisibilityIcon />}
                </Tooltip>
            </div>
        </div>
    );
};

export default SharedSurvey;
