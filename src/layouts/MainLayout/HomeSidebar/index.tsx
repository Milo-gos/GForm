import React, { useState } from 'react';
import style from './homesidebar.module.scss';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FaWpforms } from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';
import useCreateNewSurveyMutation from '../../../pages/Home/mutation/createNewSurvey';
import { useAppDispatch } from '../../../redux';
import { setLoading } from '../../../redux/slice/global';
import { setSearchString } from '../../../redux/slice/surveyManagement';

const cx = classNames.bind(style);
const HomeSidebar = () => {
    const navigate = useNavigate();
    const dispatchApp = useAppDispatch();
    const [indexActive, setIndexActive] = useState(0);
    const handleClickNav = (index: number) => {
        setIndexActive(index);
        dispatchApp(setSearchString(''));
        if (index === 0) {
            navigate('/');
        } else navigate('/shared-survey');
    };
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('add-button')} onClick={handleClickAddButton}>
                <AddOutlinedIcon style={{ color: '#fff', fontSize: '45px' }} />
            </div>
            <div className={cx('item-nav-wrapper')}>
                <div
                    className={cx('item-nav', {
                        active: indexActive === 0,
                    })}
                    onClick={() => handleClickNav(0)}>
                    <div className={cx('vertical-active')}></div>
                    <FaWpforms style={{ fontSize: '20px' }} />
                    <span>Khảo sát của tôi</span>
                </div>

                <div
                    className={cx('item-nav', {
                        active: indexActive === 1,
                    })}
                    onClick={() => handleClickNav(1)}>
                    <div className={cx('vertical-active')}></div>
                    <FaRegShareSquare style={{ fontSize: '20px' }} />
                    <span>Khảo sát được chia sẻ</span>
                </div>
            </div>
        </div>
    );
};

export default HomeSidebar;
