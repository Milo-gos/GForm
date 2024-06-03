import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { forwardRef } from 'react';
import style from './questiontextinput.module.scss';
import classNames from 'classnames/bind';
import { IoEye, IoEyeOff } from 'react-icons/io5';
const cx = classNames.bind(style);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    register?: any;
    typePassword?: boolean;
    isActiveQuestion?: boolean;
    isFocus?: boolean;
    isTitleForm?: boolean;
    padding?: string;
    isQuestionHeading?: boolean;
}

const QuestionTextInput: React.FC<InputProps> = ({
    name,
    register,
    typePassword,
    isActiveQuestion,
    isQuestionHeading,
    padding,
    isFocus,
    isTitleForm,
    ...rest
}) => {
    const [hide, setHide] = useState(!!typePassword);
    const [focus, setFocus] = useState(isFocus);
    const ref = useRef<HTMLDivElement>(null);

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
    const handleClickInside = () => {
        setFocus(true);
    };
    return (
        <div
            ref={ref}
            onClick={handleClickInside}
            className={cx('wrapper', {
                isFocus: focus === true,
                isActiveQuestion: isActiveQuestion === true,
                isTitleForm: isTitleForm === true,
                isQuestionHeading: isQuestionHeading === true,
            })}>
            <input
                type={hide ? 'password' : 'text'}
                {...register?.(name)}
                {...rest}
                style={{ padding: padding }}></input>
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

export default QuestionTextInput;
