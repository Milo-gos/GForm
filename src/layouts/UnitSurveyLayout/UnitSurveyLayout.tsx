import React, { useState } from 'react';
import style from './uniturveylayout.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import classNames from 'classnames/bind';
import { Logo } from '../../assets/images';
import { MyButton } from '../../components';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { useAppSelector } from '../../redux';
import Modal from '../../components/Modal';
import ShareInnerModal from './components/ShareInnerModal';

const cx = classNames.bind(style);

const UnitSurveyLayout = ({ children }: { children?: JSX.Element }) => {
    const survey = useAppSelector((state) => state.survey);
    const [isOpenModalShare, setOpenModalShare] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const handleClickPreview = () => {
        window.open(`/surveys/${id}/viewform`);
    };

    const handleClickOpen = () => {
        setOpenModalShare(true);
    };
    const handleClickClose = () => {
        setOpenModalShare(false);
    };
    const location = useLocation();
    const indexTab = location.hash === '#response' ? 1 : location.hash === '#setting' ? 2 : 0;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('toolbar')}>
                    <div className={cx('left')}>
                        <div
                            className={cx('logo-wrapper', 'item-toolbar')}
                            onClick={() =>
                                navigate('/', {
                                    replace: true,
                                })
                            }>
                            <img className={cx('logo')} src={Logo}></img>
                        </div>
                        <div className={cx('survey-about')}>
                            <h3 style={{ fontSize: '18px' }}>{survey.title}</h3>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <Tooltip title="Xem trước">
                            <IconButton style={{ padding: '12px' }} onClick={handleClickPreview}>
                                <RemoveRedEyeOutlinedIcon style={{ fontSize: '28px' }} />
                            </IconButton>
                        </Tooltip>
                        <MyButton textButton="Chia sẻ" onClick={handleClickOpen}></MyButton>
                    </div>
                </div>
                <div className={cx('tab-list')}>
                    <Link
                        to={`/surveys/${id}/edit`}
                        replace={true}
                        className={cx('tab', {
                            active: indexTab === 0,
                        })}>
                        <a>Câu hỏi</a>
                    </Link>
                    <Link
                        to={'#response'}
                        replace={true}
                        className={cx('tab', {
                            active: indexTab === 1,
                        })}>
                        <a>Phản hồi</a>
                    </Link>
                    <Link
                        to={'#setting'}
                        replace={true}
                        className={cx('tab', {
                            active: indexTab === 2,
                        })}>
                        <a>Cài đặt</a>
                    </Link>
                </div>
            </div>
            <div className={cx('children-wrapper')}>{children}</div>

            {isOpenModalShare && (
                <Modal onClickClose={handleClickClose}>
                    <ShareInnerModal setOpenModalShare={setOpenModalShare} />
                </Modal>
            )}
        </div>
    );
};

export default UnitSurveyLayout;
