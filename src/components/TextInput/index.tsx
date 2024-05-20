import React, { InputHTMLAttributes, useState } from 'react';
import style from './textinput.module.scss';
import classNames from 'classnames/bind';
import { IoEye, IoEyeOff } from 'react-icons/io5';
const cx = classNames.bind(style);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    register?: any;
    typePassword?: boolean;
}

const TextInput: React.FC<InputProps> = ({
    name,
    register,
    typePassword,
    ...rest
}) => {
    const [hide, setHide] = useState(!!typePassword);
    return (
        <div className={cx('wrapper')}>
            <input
                type={hide ? 'password' : 'text'}
                {...register?.(name)}
                {...rest}
            ></input>
            {typePassword && (
                <span
                    className={cx('obscured')}
                    onClick={() => setHide((prev) => !prev)}
                >
                    {hide ? (
                        <IoEyeOff className={cx('icon')} />
                    ) : (
                        <IoEye className={cx('icon')} />
                    )}
                </span>
            )}
        </div>
    );
};

export default TextInput;
