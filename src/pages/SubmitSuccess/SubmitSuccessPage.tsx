import React, { useEffect } from 'react';
import style from './submit-success.module.scss';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

const cx = classNames.bind(style);

const SubmitSuccessPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const survey = useAppSelector((state) => state.submitForm);

    useEffect(() => {
        if (!survey.title) {
            console.log('ko co');
            navigate(`/surveys/${id}/viewForm`, {
                replace: true,
            });
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <img src={survey.backgroundImage} />
            </div>

            <div className={cx('form-header')}>
                <h2>{survey.title}</h2>
                <p>Cảm ơn bạn đã tham gia khảo sát</p>

                <div style={{ marginTop: '32px' }}>
                    <a className={cx('url')} href={`/surveys/${id}/viewForm`}>
                        Gửi một phản hồi khác
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SubmitSuccessPage;
