import React, { useState } from 'react';
import style from './share-inner-modal.module.scss';
import classNames from 'classnames/bind';

import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LinkIcon from '@mui/icons-material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Tooltip } from '@mui/material';
import MailTab from '../MailTab';
import LinkTab from '../LinkTab';
import { FacebookShareButton } from 'react-share';
import { useAppSelector } from '../../../../redux/store';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(style);
interface Props {
    setOpenModalShare?: React.Dispatch<React.SetStateAction<boolean>>;
}
const ShareInnerModal = ({ setOpenModalShare }: Props) => {
    const { id } = useParams();
    const survey = useAppSelector((state) => state.survey);
    const [indexTab, setIndexTab] = useState<number>(0);

    const handleClickTab = (indexTab: number) => {
        setIndexTab(indexTab);
    };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Chia sẻ</h2>
            <div className={cx('toolbar')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ fontWeight: '500' }}>Chia sẻ với</div>
                    <div className={cx('tab-list')}>
                        <div
                            onClick={() => handleClickTab(0)}
                            className={cx('tab', {
                                active: indexTab === 0,
                            })}>
                            <a>
                                <MailOutlineOutlinedIcon className={cx('icon')} />
                            </a>
                        </div>
                        <div
                            onClick={() => handleClickTab(1)}
                            className={cx('tab', {
                                active: indexTab === 1,
                            })}>
                            <a>
                                <LinkIcon className={cx('icon')} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={cx('social')}>
                    <FacebookShareButton url={`${window.location.origin}/${id}/viewform`} hashtag={`#${survey.title}`}>
                        <Tooltip
                            title="Chia sẻ qua Facebook"
                            PopperProps={{
                                style: { zIndex: 10001, position: 'relative' }, // Đặt giá trị zIndex bạn mong muốn
                            }}>
                            <FacebookIcon className={cx('icon')} />
                        </Tooltip>
                    </FacebookShareButton>
                </div>
            </div>

            {indexTab === 0 && <MailTab setOpenModalShare={setOpenModalShare} />}
            {indexTab === 1 && <LinkTab setOpenModalShare={setOpenModalShare} />}
        </div>
    );
};

export default ShareInnerModal;
