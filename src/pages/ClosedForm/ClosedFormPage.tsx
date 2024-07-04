import React from 'react';
import style from './closed-form.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { useGetPublicSurveyByIdQuery } from '../../hooks/api-hooks/queries';

const cx = classNames.bind(style);

const SubmitSuccessPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetPublicSurveyByIdQuery(id!);

    return (
        <div className={cx('wrapper')}>
            {isLoading && <MoonLoader color="#ed6c02" size={30} />}
            {data && (
                <>
                    <div className={cx('background')}>
                        <img src={data.backgroundImage} />
                    </div>

                    <div className={cx('form-header')}>
                        <h2>{data.title}</h2>
                        <p>Khảo sát dừng nhận phản hồi</p>
                        <p>Hãy thử liên hệ với chủ sở hữu biểu mẫu nếu bạn cho rằng đây là sự nhầm lẫn</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default SubmitSuccessPage;
