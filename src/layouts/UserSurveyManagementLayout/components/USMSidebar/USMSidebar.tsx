import React, { useState } from 'react';
import style from './usmsidebar.module.scss';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaWpforms } from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';
import useCreateNewSurveyMutation from '../../../../pages/UserSurveyManagement/mutation/createNewSurvey';
import { setLoading } from '../../../../redux/slice/global';
import { setSearchString } from '../../../../redux/slice/surveyManagement';
import { useAppDispatch } from '../../../../redux';

const cx = classNames.bind(style);
const UserSidebar = () => {
    const navigate = useNavigate();
    const dispatchApp = useAppDispatch();

    const CreateNewSurveyMutation = useCreateNewSurveyMutation();
    const handleClickAddButton = () => {
        dispatchApp(setLoading(true));
        CreateNewSurveyMutation.mutate(undefined, {
            onSuccess(data) {
                navigate(`/surveys/${data.id}/edit`);
                dispatchApp(setLoading(false));
            },
            onError() {
                dispatchApp(setLoading(false));
            },
        });
    };

    const location = useLocation();
    const indexActive = location.hash === '#shared' ? 1 : 0;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('add-button')} onClick={handleClickAddButton}>
                <AddOutlinedIcon style={{ color: '#fff', fontSize: '45px' }} />
            </div>
            <div className={cx('item-nav-wrapper')}>
                <Link
                    to={'/user-survey-management'}
                    className={cx('item-nav', {
                        active: indexActive === 0,
                    })}>
                    <div className={cx('vertical-active')}></div>
                    <FaWpforms style={{ fontSize: '20px' }} />
                    <span>Khảo sát của tôi</span>
                </Link>

                <Link
                    to={'#shared'}
                    className={cx('item-nav', {
                        active: indexActive === 1,
                    })}>
                    <div className={cx('vertical-active')}></div>
                    <FaRegShareSquare style={{ fontSize: '20px' }} />
                    <span>Khảo sát được chia sẻ</span>
                </Link>
            </div>
        </div>
    );
};

export default UserSidebar;
