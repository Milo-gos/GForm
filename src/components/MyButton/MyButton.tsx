import React from 'react';
import style from './my-button.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

interface MyButtonProps {
    textButton: string;
    size?: 'normal' | 'big';
    type?: 'button' | 'reset' | 'submit';
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    noBackground?: boolean;
    form?: string;
    onClick?: (data: any) => void;
}

const MyButton = (props: MyButtonProps) => {
    return (
        <button
            form={props.form}
            style={{
                backgroundColor: props.backgroundColor,
                color: props.textColor,
                padding: props.padding,
            }}
            className={cx('wrapper', 'responsive', {
                big: props.size === 'big',
                noBackground: props.noBackground === true,
            })}
            onClick={props.onClick}
            type={props.type}>
            <span>{props.textButton}</span>
        </button>
    );
};

export default MyButton;
