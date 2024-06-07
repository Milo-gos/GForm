import React, { ReactElement, useState } from 'react';
import style from './surveylayout.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import classNames from 'classnames/bind';
import { ImageSignin, Logo } from '../../assets/images';
import { MyLabel, MyButton } from '../../components';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { useAppSelector } from '../../redux';
import Modal from '../../components/Modal';
import ShareInnerModal from './ShareInnerModal';

const cx = classNames.bind(style);

const SurveyLayout = ({ children }: { children?: JSX.Element }) => {
    const survey = useAppSelector((state) => state.survey);
    const [isOpenModalShare, setOpenModalShare] = useState(false);
    const [indexTab, setIndexTab] = useState<number>(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const handleClickTab = (indexTab: number) => {
        setIndexTab(indexTab);
        if (indexTab === 0) navigate(`/surveys/${id}/edit`);
        else navigate(`/surveys/${id}/response`);
    };
    const handleClickPreview = () => {
        window.open(`/surveys/${id}/viewform`);
    };

    const handleClickOpen = () => {
        setOpenModalShare(true);
    };
    const handleClickClose = () => {
        setOpenModalShare(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('toolbar')}>
                    <div className={cx('left')}>
                        <div className={cx('logo-wrapper', 'item-toolbar')}>
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
                        <IconButton style={{ padding: '12px' }}>
                            <BsThreeDotsVertical size={24} />
                        </IconButton>
                    </div>
                </div>
                <div className={cx('tab-list')}>
                    <div
                        onClick={() => handleClickTab(0)}
                        className={cx('tab', {
                            active: indexTab === 0,
                        })}>
                        <a>Câu hỏi</a>
                    </div>
                    <div
                        onClick={() => handleClickTab(1)}
                        className={cx('tab', {
                            active: indexTab === 1,
                        })}>
                        <a>Phản hồi</a>
                    </div>
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

export default SurveyLayout;
