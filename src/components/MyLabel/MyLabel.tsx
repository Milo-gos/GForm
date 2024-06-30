import React from 'react';
import style from './my-label.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

interface Props {
    label: string;
    size?: 'normal' | 'big';
    backgroundColor?: string;
    textColor?: string;
}
const MyLabel = (props: Props) => {
    return (
        <div
            style={{ backgroundColor: props.backgroundColor, color: props.textColor }}
            className={cx('wrapper', {
                big: props.size === 'big',
                normal: props.size === 'normal',
            })}>
            {props.label}
        </div>
    );
};

export default MyLabel;
