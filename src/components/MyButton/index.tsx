import React from 'react';
import style from './mybutton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

interface Props {
    textButton: string;
    onClick?: (data: any) => void;
    size?: 'normal' | 'big';
    type?: 'button' | 'reset' | 'submit' | undefined;
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    noBackground?: boolean;
    form?: string;
}
const MyButton = (props: Props) => {
    return (
        <button
            form={props.form}
            style={{
                backgroundColor: props.backgroundColor,
                color: props.textColor,
                padding: props.padding,
            }}
            className={cx('wrapper', {
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
