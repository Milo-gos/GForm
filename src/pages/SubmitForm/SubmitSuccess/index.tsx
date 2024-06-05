import React from 'react';
import style from '../submitform.module.scss';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux';

const cx = classNames.bind(style);

const SubmitSuccessPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const survey = useAppSelector((state) => state.submitForm);
    if (!survey.title) {
        window.location.href = `/surveys/${id}/viewForm`;
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" />
            </div>

            <div className={cx('form-header')}>
                <h2>{survey.title}</h2>
                <p>Cảm ơn bạn đã tham gia khảo sát</p>
            </div>

            <div style={{ marginTop: '32px' }}>
                <a className={cx('url')} href={`/surveys/${id}/viewForm`}>
                    Gửi một phản hồi khác
                </a>
            </div>
        </div>
    );
};

export default SubmitSuccessPage;
