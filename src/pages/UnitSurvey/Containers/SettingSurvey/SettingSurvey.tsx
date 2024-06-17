import React, { useEffect, useState } from 'react';
import style from './settingsurvey.module.scss';
import classNames from 'classnames/bind';
import useChangeSurveyMutation from '../../mutation/changeSurvey';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSharedUserSurvey } from '../../../../utils/API/axios';
import { setLoading } from '../../../../redux/slice/global';
import TeamMember from './components/TeamMember';

const cx = classNames.bind(style);

const ResponseSurveyPage = () => {
    const { id } = useParams();
    const dispatchApp = useAppDispatch();
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: [`getSharedUserSurvey_${id}`],
        queryFn: () => getSharedUserSurvey(id!),
        refetchOnWindowFocus: false,
        retry: 0,
    });
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isLoading) {
            dispatchApp(setLoading(true));
        }
        if (isSuccess || isError) {
            dispatchApp(setLoading(false));
        }
    }, [isLoading, isError, isSuccess, dispatchApp]);

    const ChangeSurveyMutation = useChangeSurveyMutation();

    if (!data) return <></>;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('section')}>
                <div className={cx('title')}>Chia sẻ</div>
                <div className={cx('body')}>
                    <div className={cx('member-survey')}>
                        <div className={cx('container')}>
                            <label className={cx('label')}>Chủ sỡ hữu</label>
                            <div className={cx('separate')}></div>
                            <div className={cx('mem-wrapper')}>
                                <TeamMember owner={data.owner} isOwner={data.isOwner} surveyId={data.surveyId} />
                            </div>
                        </div>
                        <div className={cx('container')}>
                            <label className={cx('label')}>Thành viên</label>
                            <div className={cx('separate')}></div>
                            <div className={cx('mem-wrapper')}>
                                {data.sharedUsers?.map((sharedUser: any) => {
                                    return (
                                        <TeamMember
                                            isOwner={data.isOwner}
                                            sharedUser={sharedUser}
                                            key={sharedUser.sharedId}
                                            surveyId={data.surveyId}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('section')}>
                <div className={cx('title')}>Cài đặt</div>
                <div className={cx('body')}></div>
            </div>
        </div>
    );
};

export default ResponseSurveyPage;
