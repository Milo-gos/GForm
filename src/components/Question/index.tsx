import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import style from './question.module.scss';
import classNames from 'classnames/bind';
import BottomQuestion from '../BottomQuestion';
import QuestionType from '../../utils/questionType';
import QuestionShortAnswer from '../QuestionShortAnswer';
import QuestionParagraph from '../QuestionParagraph';
import QuestionDropDown from '../QuestionDropDown';
import QuestionCheckbox from '../QuestionCheckbox';
import QuestionRadioButton from '../QuestionRadioButton';
import QuestionLinearScale from '../QuestionLinearScale';
import Description from '../Description';
import QuestionTextInput from '../QuestionTextInput';
import QuestionRadioButtonGrid from '../QuestionRadioButtonGrid';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IconButton } from '@mui/material';
const cx = classNames.bind(style);

interface Props {
    type?: QuestionType;
    id: string;
}
const Question = ({ type, id }: Props) => {
    const [isActiveQuestion, setActiveQuestion] = useState(false);
    const myRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (myRef.current && !myRef.current.contains(event.target as Node)) {
                setTimeout(() => {
                    setActiveQuestion(false);
                }, 200);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [myRef]);
    useEffect(() => {
        if (isActiveQuestion) {
            const topElement = myRef.current?.offsetTop;
            window.scroll({ top: topElement, behavior: 'smooth' });
        }
    }, [isActiveQuestion]);

    const handleClickInside = () => {
        setActiveQuestion(true);
    };

    const handleClickAddImageQuestion = () => {
        console.log('qq');
    };
    const heading = type !== QuestionType.Description ? 'Câu hỏi' : 'Tiêu đề';
    return (
        <div className={cx('wrapper')} ref={myRef}>
            {isActiveQuestion && (
                <div className={cx('add', 'before')}>
                    <div className={cx('separate')}></div>
                    <IoIosAddCircleOutline className={cx('icon')} />
                    <div className={cx('separate')}></div>
                </div>
            )}
            <div
                className={cx('body', {
                    isActiveQuestion: isActiveQuestion === true,
                })}
                onClick={handleClickInside}>
                <div className={cx('question-wrapper')}>
                    <div style={{ flex: '1' }}>
                        <QuestionTextInput
                            placeholder={heading}
                            isActiveQuestion={isActiveQuestion}
                            isQuestionHeading={true}></QuestionTextInput>
                    </div>

                    {isActiveQuestion && (
                        <IconButton style={{ padding: '12px' }} onClick={handleClickAddImageQuestion}>
                            <ImageOutlinedIcon style={{ fontSize: '28px' }} />
                        </IconButton>
                    )}
                </div>

                {type === QuestionType.ShortAnswer && <QuestionShortAnswer />}
                {type === QuestionType.Paragraph && <QuestionParagraph />}
                {type === QuestionType.Dropdown && <QuestionDropDown isActiveQuestion={isActiveQuestion} />}
                {type === QuestionType.Checkbox && <QuestionCheckbox isActiveQuestion={isActiveQuestion} />}
                {type === QuestionType.RadioButton && <QuestionRadioButton isActiveQuestion={isActiveQuestion} />}
                {type === QuestionType.LinearScale && <QuestionLinearScale isActiveQuestion={isActiveQuestion} />}
                {type === QuestionType.Description && <Description isActiveQuestion={isActiveQuestion} />}

                {type === QuestionType.RadioButtonGrid && (
                    <QuestionRadioButtonGrid isActiveQuestion={isActiveQuestion} />
                )}

                {isActiveQuestion && <BottomQuestion type={type} />}
            </div>

            {isActiveQuestion && (
                <div className={cx('add', 'after')}>
                    <div className={cx('separate')}></div>
                    <IoIosAddCircleOutline className={cx('icon')} />
                    <div className={cx('separate')}></div>
                </div>
            )}
        </div>
    );
};

export default Question;
