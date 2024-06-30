import React, { useState } from 'react';
import style from './link-tab.module.scss';
import classNames from 'classnames/bind';
import { MyButton, NormalTextInput } from '../../../../components';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(style);

interface Props {
    setOpenModalShare?: React.Dispatch<React.SetStateAction<boolean>>;
}
const LinkTab = ({ setOpenModalShare }: Props) => {
    const { id } = useParams();
    const [isCopied, setCopied] = useState(false);
    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
    };
    const copyLink = `${window.location.origin}/surveys/${id}/viewform`;
    const handleClickCancel = () => {
        setOpenModalShare!(false);
    };
    const handleClickCopyLink = () => {
        navigator.clipboard.writeText(copyLink);
        setCopied(true);
    };
    return (
        <div className={cx('wrapper')}>
            <span style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px', display: 'block' }}>
                Liên kết
            </span>

            <form className={cx('form')}>
                <div className={cx('form-control')}>
                    <NormalTextInput
                        placeholder="Liên kết"
                        style={{ padding: '2px 0px', marginTop: '6px' }}
                        value={copyLink}
                    />
                    {isCopied && <p style={{ marginTop: '4px' }}>Đã sao chép</p>}
                </div>
            </form>

            <div className={cx('bottom')}>
                <div>
                    <MyButton textButton="Hủy" noBackground onClick={handleClickCancel} />
                </div>
                <div>
                    <MyButton textButton="Sao chép" onClick={handleClickCopyLink} />
                </div>
            </div>
        </div>
    );
};

export default LinkTab;
