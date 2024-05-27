import React, { useEffect, useRef, useState } from 'react';
import style from './questionradiobutton.module.scss';
import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosAddCircleOutline } from 'react-icons/io';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import QuestionTextInput from '../QuestionTextInput';
const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
}
const QuestionRadioButton = ({ isActiveQuestion }: Props) => {
    const [listOption, setListOption] = useState([1]);
    const [hasOther, setHasOther] = useState(false);
    const handleClickAddOption = () => {
        setListOption((prev) => [...prev, 1]);
    };
    const handleClickRemoveOption = (indexRemove: number) => {
        setListOption((prev) => [...prev].filter((item, index) => index !== indexRemove));
    };

    return (
        <div className={cx('wrapper')}>
            {listOption.map((item, index) => {
                return (
                    <div key={index} className={cx('option-wrapper')}>
                        <RadioButtonUncheckedOutlinedIcon style={{ color: '#bdbdbd' }} />
                        <div style={{ flex: '1' }}>
                            <QuestionTextInput isActiveQuestion={isActiveQuestion} />
                        </div>
                        {listOption.length > 1 && isActiveQuestion && (
                            <CloseIcon
                                style={{ cursor: 'pointer', color: 'rgb(95, 99, 104)' }}
                                onClick={() => handleClickRemoveOption(index)}
                            />
                        )}
                    </div>
                );
            })}
            {hasOther && (
                <div className={cx('option-wrapper')}>
                    <RadioButtonUncheckedOutlinedIcon style={{ color: '#bdbdbd' }} />
                    <div style={{ flex: '1' }}>
                        <div className={cx('other')}>Khác...</div>
                    </div>
                    {listOption.length > 1 && isActiveQuestion && (
                        <CloseIcon
                            style={{ cursor: 'pointer', color: 'rgb(95, 99, 104)' }}
                            onClick={() => setHasOther(false)}
                        />
                    )}
                </div>
            )}
            {isActiveQuestion && (
                <div className={cx('add-option-other')}>
                    <div onClick={handleClickAddOption} className={cx('add-option')}>
                        <IoIosAddCircleOutline size={24} />
                        <div>
                            <p>Thêm lựa chọn</p>
                            <div className={cx('underline')}></div>
                        </div>
                    </div>
                    <div className={cx('add-other')} onClick={() => setHasOther(true)}>
                        <p>
                            hoặc <span>{'thêm "khác"'}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionRadioButton;
