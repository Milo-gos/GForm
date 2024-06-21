import React, { useEffect, useRef, useState } from 'react';
import style from './sharedsurveycomponent.module.scss';
import classNames from 'classnames/bind';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Tooltip } from '@mui/material';
import stringAvatar from '../../../../../../utils/stringAvatar';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation('surveyManagement');

    const navigate = useNavigate();
    const handleClickSharedSurvey = () => {
        navigate(`/surveys/${sharedSurvey?.id}/edit`);
    };
    return (
        <div
            className={cx('wrapper', 'responsive', {
                isAccepting: sharedSurvey?.isAccepting === true,
            })}
            onClick={handleClickSharedSurvey}>
            <div className={cx('title')}>
                <FeedOutlinedIcon className={cx('icon')} />
                <span>{sharedSurvey?.title}</span>
            </div>
            <div className={cx('separate')}></div>
            <div className={cx('question', 'col')}>
                <span>{t('questions')}</span>
                <span className={cx('bold')}>{sharedSurvey?.questionsCount}</span>
            </div>
            <div className={cx('response', 'col')}>
                <span>{t('responses')}</span>
                <span className={cx('bold')}>{sharedSurvey?.responsesCount}</span>
            </div>

            <div className={cx('status', 'col')}>
                <span>{t('status')}</span>
                <span className={cx('bold')}>
                    {sharedSurvey?.isAccepting ? t('accepting_response') : t('stop_response')}
                </span>
            </div>

            <div className={cx('owner', 'col')}>
                <span>{t('creator')}</span>
                <Tooltip title={sharedSurvey?.ownerName}>
                    <div className={cx('avatar')}>
                        {sharedSurvey?.ownerAvatar ? (
                            <Avatar src={sharedSurvey?.ownerAvatar} sx={{ width: '100%', height: '100%' }} />
                        ) : (
                            <Avatar
                                {...stringAvatar(sharedSurvey?.ownerName || '')}
                                sx={{ width: '100%', height: '100%' }}
                            />
                        )}
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
