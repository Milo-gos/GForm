import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { forwardRef } from 'react';
import style from './textinput.module.scss';
import classNames from 'classnames/bind';
import { IoEye, IoEyeOff } from 'react-icons/io5';
const cx = classNames.bind(style);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    register?: any;
    typePassword?: boolean;
    fontSize?: string;
    fontWeight?: number;
    padding?: string;
    isActiveQuestion?: boolean;
    boldPlaceHolder?: boolean;
}

const TextInput: React.FC<InputProps> = ({
    name,
    register,
    typePassword,
    fontSize,
    padding,
    fontWeight,
    isActiveQuestion,
    boldPlaceHolder,
    ...rest
}) => {
    const [hide, setHide] = useState(!!typePassword);

    return (
        <div
            className={cx('wrapper', {
                isActiveQuestion: isActiveQuestion === true,
                boldPlaceHolder: boldPlaceHolder === true,
            })}>
            <input
                type={hide ? 'password' : 'text'}
                {...register?.(name)}
                {...rest}
                autoFocus={isActiveQuestion}
                style={{ fontSize: fontSize, padding: padding }}></input>
            {typePassword && (
                <span className={cx('obscured')} onClick={() => setHide((prev) => !prev)}>
                    {hide ? <IoEyeOff className={cx('icon')} /> : <IoEye className={cx('icon')} />}
                </span>
            )}
            <div className={cx('border')}></div>
        </div>
    );
};

export default TextInput;
