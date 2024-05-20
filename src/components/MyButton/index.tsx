import React from 'react';
import style from './mybutton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

interface Props {
    textButton: string;
    onClick?: (data: any) => void;
    size?: 'small' | 'big';
    type?: 'button' | 'reset' | 'submit' | undefined;
}
const MyButton = (props: Props) => {
    return (
        <button
            className={cx('wrapper', {
                big: props.size === 'big',
            })}
            onClick={props.onClick}
            type={props.type}
        >
            <span>{props.textButton}</span>
        </button>
    );
};

export default MyButton;
