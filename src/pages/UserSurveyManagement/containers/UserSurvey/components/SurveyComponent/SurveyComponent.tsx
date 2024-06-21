import React, { useEffect, useRef, useState } from 'react';
import style from './surveycomponent.module.scss';
import classNames from 'classnames/bind';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { useNavigate } from 'react-router-dom';
import convertDate from '../../../../../../utils/convertDate';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);

interface SurveyData {
    id: string;
    ownerId: string;
    title: string;
    description: string;
    isAccepting: boolean;
    questionsCount: string;
    responsesCount: string;
    create_at: string;
}
interface Props {
    index?: number;
    survey?: SurveyData;
}
const SurveyComponent = ({ index, survey }: Props) => {
    const navigate = useNavigate();
    const { t } = useTranslation('surveyManagement');
    const handleClickSurvey = () => {
        navigate(`/surveys/${survey?.id}/edit`);
    };
    return (
        <div
            className={cx('wrapper', 'responsive', {
                isAccepting: survey?.isAccepting === true,
            })}
            onClick={handleClickSurvey}>
            <div className={cx('left')}>
                <div className={cx('title')}>
                    <FeedOutlinedIcon className={cx('icon')} />
                    <span>{survey?.title}</span>
                </div>
                <div className={cx('separate')}></div>
                <div className={cx('question', 'col')}>
                    <span>{t('questions')}</span>
                    <span className={cx('bold')}>{survey?.questionsCount}</span>
                </div>
            </div>
            <div className={cx('right')}>
                <div className={cx('status', 'col')}>
                    <span>{t('status')}</span>
                    <span className={cx('bold')}>
                        {survey?.isAccepting ? t('accepting_response') : t('stop_response')}
                    </span>
                </div>

                <div className={cx('response', 'col')}>
                    <span>{t('responses')}</span>
                    <span className={cx('bold')}>{survey?.responsesCount}</span>
                </div>
                <div className={cx('response', 'col')}>
                    <span>{t('create_date')}</span>
                    <span className={cx('bold')}>{convertDate(survey!.create_at)}</span>
                </div>
            </div>
        </div>
    );
};

export default SurveyComponent;
