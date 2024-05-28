import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import style from './question.module.scss';
import classNames from 'classnames/bind';
import BottomQuestion from '../BottomQuestion';
import QuestionType from '../../utils/interfaces/questionType';
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
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { CgArrowsExchangeAlt } from 'react-icons/cg';
import { useAppDispatch, useAppSelector } from '../../redux';
import { activeQuestion, insertQuestion } from '../../redux/slice/survey';
import { EditNotifications } from '@mui/icons-material';
const cx = classNames.bind(style);

interface Props {
    index: number;
}
const Question = ({ index }: Props) => {
    const question = useAppSelector((state) => state.survey.questions[index]);
    const indexActiveQuestion = useAppSelector((state) => state.survey.indexActiveQuestion);
    const isActiveQuestion = index === indexActiveQuestion;
    const dispatchApp = useAppDispatch();

    const myRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isActiveQuestion) {
            const topElement = myRef.current?.offsetTop;
            window.scroll({ top: topElement, behavior: 'smooth' });
        }
    }, [isActiveQuestion]);

    const handleClickInsideQuestion = () => {
        dispatchApp(activeQuestion(index));
    };

    const handleClickAddImageQuestion = () => {
        console.log('qq');
    };
    const handleInsertQuestion = (position: number) => {
        dispatchApp(insertQuestion(position));
    };
    const heading = question.questionType !== QuestionType.Description ? 'Câu hỏi' : 'Tiêu đề';

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className={cx('wrapper')} ref={myRef}>
            {isActiveQuestion && (
                <div className={cx('add', 'before')} onClick={() => handleInsertQuestion(index)}>
                    <div className={cx('separate')}></div>
                    <IoIosAddCircleOutline className={cx('icon')} />
                    <div className={cx('separate')}></div>
                </div>
            )}
            <div
                className={cx('body', {
                    isActiveQuestion: isActiveQuestion === true,
                })}
                onClick={handleClickInsideQuestion}>
                <div className={cx('question-wrapper')}>
                    <div style={{ flex: '1' }}>
                        <QuestionTextInput
                            placeholder={heading}
                            isActiveQuestion={isActiveQuestion}
                            isQuestionHeading={true}></QuestionTextInput>
                    </div>

                    <div>
                        {isActiveQuestion && (
                            <IconButton style={{ padding: '12px' }} onClick={handleClickAddImageQuestion}>
                                <ImageOutlinedIcon style={{ fontSize: '28px' }} />
                            </IconButton>
                        )}
                        {isActiveQuestion && (
                            <IconButton style={{ padding: '12px' }} onClick={handleClickAddImageQuestion}>
                                <CgArrowsExchangeAlt />
                            </IconButton>
                        )}
                        <Button
                            style={{
                                padding: '0',
                                borderRadius: '50%',
                            }}
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            disableElevation
                            onClick={handleClick}>
                            <IconButton style={{ padding: '12px' }} onClick={handleClickAddImageQuestion}>
                                <CgArrowsExchangeAlt />
                            </IconButton>
                        </Button>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={handleClose} disableRipple>
                                <EditNotifications />
                                Edit
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
                {question.isHasDescription && (
                    <QuestionTextInput placeholder={'Mô tả'} isActiveQuestion={isActiveQuestion}></QuestionTextInput>
                )}

                {question.questionType === QuestionType.ShortAnswer && <QuestionShortAnswer />}
                {question.questionType === QuestionType.Paragraph && <QuestionParagraph />}
                {question.questionType === QuestionType.Dropdown && (
                    <QuestionDropDown isActiveQuestion={isActiveQuestion} />
                )}
                {question.questionType === QuestionType.Checkbox && (
                    <QuestionCheckbox isActiveQuestion={isActiveQuestion} />
                )}
                {question.questionType === QuestionType.RadioButton && (
                    <QuestionRadioButton isActiveQuestion={isActiveQuestion} />
                )}
                {question.questionType === QuestionType.LinearScale && (
                    <QuestionLinearScale isActiveQuestion={isActiveQuestion} />
                )}
                {question.questionType === QuestionType.Description && (
                    <Description isActiveQuestion={isActiveQuestion} />
                )}

                {question.questionType === QuestionType.RadioButtonGrid && (
                    <QuestionRadioButtonGrid isActiveQuestion={isActiveQuestion} />
                )}

                {isActiveQuestion && <BottomQuestion type={question.questionType} indexQuestion={index} />}
            </div>

            {isActiveQuestion && (
                <div className={cx('add', 'after')} onClick={() => handleInsertQuestion(index + 1)}>
                    <div className={cx('separate')}></div>
                    <IoIosAddCircleOutline className={cx('icon')} />
                    <div className={cx('separate')}></div>
                </div>
            )}
        </div>
    );
};

export default Question;
