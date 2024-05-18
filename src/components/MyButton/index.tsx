import React from 'react';
import style from './mybutton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

interface Props {
    textButton: string;
    onClick?: () => void;
    size?: 'small' | 'big';
}
const MyButton = (props: Props) => {
    return (
        <div
            className={cx('wrapper', {
                big: props.size === 'big',
            })}
        >
            <span>{props.textButton}</span>
        </div>
    );
};

export default MyButton;
