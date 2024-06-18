import React, { useEffect } from 'react';
import style from './closedform.module.scss';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux';
import { useQuery } from '@tanstack/react-query';
import { getPublicSurveyById } from '../../utils/API/axios';

const cx = classNames.bind(style);

const SubmitSuccessPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: [`getPublicSurveyById_${id}`],
        queryFn: () => getPublicSurveyById(id!),
        refetchOnWindowFocus: false,
        retry: 0,
    });

    if (!data) return <></>;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <img src={data.backgroundImage} />
            </div>

            <div className={cx('form-header')}>
                <h2>{data.title}</h2>
                <p>Khảo sát dừng nhận phản hồi</p>
                <p>Hãy thử liên hệ với chủ sở hữu biểu mẫu nếu bạn cho rằng đây là sự nhầm lẫn</p>
            </div>
        </div>
    );
};

export default SubmitSuccessPage;
