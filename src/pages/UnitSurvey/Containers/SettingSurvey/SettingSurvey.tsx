import React, { useEffect, useState } from 'react';
import style from './settingsurvey.module.scss';
import classNames from 'classnames/bind';
import useChangeSurveyMutation from '../../mutation/changeSurvey';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSharedUserSurvey } from '../../../../API/axios';
import { setLoading } from '../../../../redux/slice/global';
import TeamMember from './components/TeamMember';
import { Modal, MyButton } from '../../../../components';
import useDeleteSurveyMutation from '../../mutation/deleteSurvey';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';

const cx = classNames.bind(style);

const SettingSurveyPage = () => {
    const { id } = useParams();
    const dispatchApp = useAppDispatch();
    const navigate = useNavigate();
    const [isLoadingDelete, setLoadingDelete] = useState(false);

    const [isOpenModal, setOpenModal] = useState(false);
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
    const handleClickClose = () => {
        setOpenModal(false);
    };

    const DeleteSurveyMutation = useDeleteSurveyMutation();
    const handleClickDeleteSurvey = () => {
        setLoadingDelete(true);
        DeleteSurveyMutation.mutate(id!, {
            onSuccess() {
                toast.success('Đã xóa khảo sát');
                setLoadingDelete(false);
                setOpenModal(false);
                navigate('/user-survey-management', {
                    replace: true,
                });
            },
            onError() {
                toast.error('Đã có lỗi xảy ra');
                setOpenModal(false);
                setLoadingDelete(false);
            },
        });
    };
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
            {data.isOwner && (
                <div className={cx('section')}>
                    <div className={cx('title')}>Cài đặt</div>
                    <div className={cx('body')}>
                        <div className={cx('row')}>
                            <div>Xóa khảo sát</div>
                            <div className={cx('btn-delete')} onClick={() => setOpenModal(true)}>
                                Xóa
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isOpenModal && (
                <Modal onClickClose={handleClickClose}>
                    <div className={cx('inner-modal')}>
                        <div>Bạn có chắc muốn xóa khảo sát?</div>
                        <div className={cx('button-wrapper')}>
                            {isLoadingDelete ? (
                                <MoonLoader color="#ed6c02" size={30} />
                            ) : (
                                <MyButton textButton="Xóa" onClick={handleClickDeleteSurvey} />
                            )}
                            <MyButton textButton="Hủy" onClick={handleClickClose} />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default SettingSurveyPage;
