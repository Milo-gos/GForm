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
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import { IoIosAddCircleOutline } from 'react-icons/io';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {
    Button,
    Divider,
    FormControl,
    IconButton,
    Menu,
    MenuItem,
    Select,
    SelectChangeEvent,
    alpha,
} from '@mui/material';
import { CgArrowsExchangeAlt } from 'react-icons/cg';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
    handleActiveQuestion,
    handleChangeDescriptionQuestion,
    handleChangeQuestion,
    handleChangeQuestionType,
    handleInsertQuestion,
} from '../../redux/slice/survey';
import ShortTextIcon from '@mui/icons-material/ShortText';
import NotesIcon from '@mui/icons-material/Notes';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

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
        if (isActiveQuestion) return;
        dispatchApp(handleActiveQuestion({ indexQuestion: index }));
    };

    const handleClickAddImageQuestion = () => {
        console.log('qq');
    };
    const handleInsertNewQuestion = (position: number) => {
        dispatchApp(
            handleInsertQuestion({
                position,
            }),
        );
    };
    const heading = question.questionType !== QuestionType.Description ? 'Câu hỏi' : 'Tiêu đề';

    const handleChangeNewQuestionType = (e: SelectChangeEvent) => {
        const questionType = e.target.value;
        dispatchApp(
            handleChangeQuestionType({
                index,
                questionType,
            }),
        );
    };
    return (
        <div className={cx('wrapper')} ref={myRef}>
            {isActiveQuestion && (
                <div className={cx('add', 'before')} onClick={() => handleInsertNewQuestion(index)}>
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
                    <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1' }}>
                            <QuestionTextInput
                                value={question.question}
                                onChange={(e) =>
                                    dispatchApp(
                                        handleChangeQuestion({
                                            indexQuestion: index,

                                            question: e.target.value,
                                        }),
                                    )
                                }
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

                    <div>
                        <Select
                            onChange={handleChangeNewQuestionType}
                            value={question.questionType}
                            MenuProps={{ disablePortal: true }}
                            slotProps={{
                                root: {
                                    sx: {
                                        p: 0,
                                        '.MuiSelect-select': {
                                            width: 160,

                                            alignItems: 'center',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            border: '1px solid #e0e0db',
                                            borderRadius: '5px 5px 0 0',
                                        },
                                        '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                            border: '1px solid #e0e0db',
                                            borderRadius: '5px 5px 0 0',
                                        },
                                        '& .MuiOutlinedInput-input': { p: 1.25 },
                                    },
                                },
                            }}>
                            <MenuItem value={QuestionType.ShortAnswer}>
                                <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                                    <div style={{ width: '30px', display: 'flex', alignItems: 'center' }}>
                                        <ShortTextIcon style={{ fontSize: '30px' }} />
                                    </div>
                                    <span style={{ marginLeft: '12px' }}>Câu trả lời ngắn</span>
                                </div>
                            </MenuItem>
                            <MenuItem value={QuestionType.Paragraph}>
                                <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                                    <div
                                        style={{
                                            width: '30px',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                        <NotesIcon style={{ fontSize: '24px' }} />
                                    </div>
                                    <span style={{ marginLeft: '12px' }}>Câu trả lời dài</span>
                                </div>
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem value={QuestionType.RadioButton}>
                                <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                                    <div
                                        style={{
                                            width: '30px',
                                            height: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                        <RadioButtonCheckedIcon style={{ fontSize: '24px' }} />
                                    </div>
                                    <span style={{ marginLeft: '12px' }}>Multiple choice</span>
                                </div>
                            </MenuItem>
                            <MenuItem value={QuestionType.Checkbox}>
                                <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                                    <div style={{ width: '30px', display: 'flex', alignItems: 'center' }}>
                                        <CheckBoxOutlinedIcon style={{ fontSize: '24px' }} />
                                    </div>
                                    <span style={{ marginLeft: '12px' }}>Checkboxes</span>
                                </div>
                            </MenuItem>
                            <MenuItem value={QuestionType.Dropdown}>
                                <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                                    <div style={{ width: '30px', display: 'flex', alignItems: 'center' }}>
                                        <ArrowDropDownCircleOutlinedIcon style={{ fontSize: '24px' }} />
                                    </div>
                                    <span style={{ marginLeft: '12px' }}>Dropdown</span>
                                </div>
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem value={QuestionType.Description}>
                                <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                                    <div style={{ width: '30px', display: 'flex', alignItems: 'center' }}>
                                        <DescriptionOutlinedIcon style={{ fontSize: '24px' }} />
                                    </div>

                                    <span style={{ marginLeft: '12px' }}>Mô tả</span>
                                </div>
                            </MenuItem>
                        </Select>
                    </div>
                </div>
                {question.isHasDescription && question.questionType !== QuestionType.Description && (
                    <QuestionTextInput
                        placeholder={'Mô tả'}
                        value={question.description}
                        onChange={(e) =>
                            dispatchApp(
                                handleChangeDescriptionQuestion({ indexQuestion: index, description: e.target.value }),
                            )
                        }
                        isActiveQuestion={isActiveQuestion}></QuestionTextInput>
                )}

                {question.questionType === QuestionType.ShortAnswer && <QuestionShortAnswer indexQuestion={index} />}
                {question.questionType === QuestionType.Paragraph && <QuestionParagraph indexQuestion={index} />}
                {question.questionType === QuestionType.Dropdown && (
                    <QuestionDropDown isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}
                {question.questionType === QuestionType.Checkbox && (
                    <QuestionCheckbox isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}
                {question.questionType === QuestionType.RadioButton && (
                    <QuestionRadioButton isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}
                {question.questionType === QuestionType.LinearScale && (
                    <QuestionLinearScale isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}
                {question.questionType === QuestionType.Description && (
                    <Description isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}

                {question.questionType === QuestionType.RadioButtonGrid && (
                    <QuestionRadioButtonGrid isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}

                {isActiveQuestion && <BottomQuestion type={question.questionType} indexQuestion={index} />}
            </div>

            {isActiveQuestion && (
                <div className={cx('add', 'after')} onClick={() => handleInsertNewQuestion(index + 1)}>
                    <div className={cx('separate')}></div>
                    <IoIosAddCircleOutline className={cx('icon')} />
                    <div className={cx('separate')}></div>
                </div>
            )}
        </div>
    );
};

export default Question;
