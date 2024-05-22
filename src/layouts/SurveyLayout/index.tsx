import React, { ReactElement, useState } from 'react';
import style from './surveylayout.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import classNames from 'classnames/bind';
import { ImageSignin, Logo } from '../../assets/images';
import { MyLabel, MyButton } from '../../components';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

const SurveyLayout = ({ children }: { children?: JSX.Element }) => {
    const [indexTab, setIndexTab] = useState<number>(1);
    const navigate = useNavigate();
    const handleClickTab = (indexTab: number) => {
        setIndexTab(indexTab);
        if (indexTab === 0) navigate('/surveys/:id/edit');
        else navigate('/surveys/:id/response');
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
                            <h3 style={{ fontSize: '16px' }}>Survey name</h3>

                            <div style={{ marginTop: '4px' }}>
                                <MyLabel label="Bản nháp" size="big" backgroundColor="#db4437"></MyLabel>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <MyButton textButton="Send"></MyButton>
                        <div className={cx('three-dot', 'item-toolbar')}>
                            <BsThreeDotsVertical size={24} />
                        </div>
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
            {children}
        </div>
    );
};

export default SurveyLayout;
