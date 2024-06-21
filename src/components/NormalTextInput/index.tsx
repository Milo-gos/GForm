import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { forwardRef } from 'react';
import style from './normaltextinput.module.scss';
import classNames from 'classnames/bind';
import { IoEye, IoEyeOff } from 'react-icons/io5';
const cx = classNames.bind(style);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    register?: any;
    typePassword?: boolean;
    isActiveQuestion?: boolean;
    isFocus?: boolean;
    boldPlaceHolder?: boolean;
    disbaled?: boolean;
}

const NormalTextInput: React.FC<InputProps> = ({ name, register, typePassword, isFocus, disabled, ...rest }) => {
    const [hide, setHide] = useState(!!typePassword);
    const [focus, setFocus] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isFocus) ref.current?.click();
    }, [isFocus]);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setFocus(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    return (
        <div
            ref={ref}
            onClick={() => setFocus(true)}
            className={cx('wrapper', 'responsive', {
                isFocus: focus === true,
            })}>
            <input
                type={hide ? 'password' : 'text'}
                {...register?.(name)}
                {...rest}
                autoFocus={focus}
                disabled={disabled}></input>

            {typePassword && (
                <span className={cx('obscured')} onClick={() => setHide((prev) => !prev)}>
                    {hide ? <IoEyeOff className={cx('icon')} /> : <IoEye className={cx('icon')} />}
                </span>
            )}
            <div className={cx('border')}></div>
            <div className={cx('inner-border')}></div>
        </div>
    );
};

export default NormalTextInput;
