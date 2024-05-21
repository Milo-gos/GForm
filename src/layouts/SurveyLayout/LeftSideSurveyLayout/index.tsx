import React, { ReactElement } from 'react';
import style from './leftsidesurveylayout.module.scss';
import { GoQuestion } from 'react-icons/go';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

const LeftSideSurveyLayout = ({ current }: { current?: number }) => {
    // const [downEditor, setDownEditor] = useState(true);
    // const handleClickSection = function (event) {
    //     event.preventDefault();
    //     setDownEditor(!downEditor)
    // }

    const cardImage = 'https://sidebaratl.com/wp-content/uploads/2022/08/Sidebar-Exterior-Day-View.jpg';

    return (
        <div className={cx('wrapper')}>
            <div>
                <div
                    className={cx('surveyInfo')}
                    style={{
                        backgroundImage: `linear-gradient(rgba(42, 42, 42, 0.2) 0px, rgb(42, 42, 42) 100%),
                url(${cardImage})`,
                    }}>
                    <div className={cx('surveyStatus')}>
                        <span>Nháp</span>
                    </div>

                    <div className={cx('survey-name')}>{'Tiêu đề'}</div>
                </div>

                <div className={cx('navItem')}>
                    <div className={cx('navItem-inner')}>
                        <GoQuestion size={28} />
                        <a href="#" className={cx('navItem-link')}>
                            <div>Câu hỏi</div>
                        </a>
                    </div>
                </div>
                <div className={cx('navItem')}>
                    <div className={cx('navItem-inner')}>
                        <GoQuestion size={28} />
                        <a href="#" className={cx('navItem-link')}>
                            <div>Phản hồi</div>
                        </a>
                    </div>
                </div>

                <div className={cx('navItem')}>
                    <div className={cx('navItem-inner')}>
                        <GoQuestion size={28} />
                        <a href="/" className={cx('navItem-link')}>
                            <div>TRANG CHỦ</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideSurveyLayout;
