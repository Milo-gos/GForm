import React, { useEffect, useRef, useState } from 'react';
import style from './surveycomponent.module.scss';
import classNames from 'classnames/bind';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { useNavigate } from 'react-router-dom';
import convertDate from '../../../../../../utils/functions/convertDate';

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
    const handleClickSurvey = () => {
        navigate(`/surveys/${survey?.id}/edit`);
    };
    return (
        <div
            className={cx('wrapper', {
                isAccepting: survey?.isAccepting === true,
            })}
            onClick={handleClickSurvey}>
            <div className={cx('title')}>
                <FeedOutlinedIcon className={cx('icon')} />
                <span>{survey?.title}</span>
            </div>
            <div className={cx('separate')}></div>
            <div className={cx('question', 'col')}>
                <span>Số câu hỏi</span>
                <span className={cx('bold')}>{survey?.questionsCount}</span>
            </div>
            <div className={cx('status', 'col')}>
                <span>Trạng thái</span>
                <span className={cx('bold')}>{survey?.isAccepting ? 'Đang nhận phản hồi' : 'Ngừng nhận phản hồi'}</span>
            </div>

            <div className={cx('response', 'col')}>
                <span>Số lượng phản hồi</span>
                <span className={cx('bold')}>{survey?.responsesCount}</span>
            </div>
            <div className={cx('response', 'col')}>
                <span>Ngày tạo</span>
                <span className={cx('bold')}>{convertDate(survey!.create_at)}</span>
            </div>
        </div>
    );
};

export default SurveyComponent;
