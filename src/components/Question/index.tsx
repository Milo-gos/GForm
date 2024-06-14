import React, { MutableRefObject, RefObject, memo, useEffect, useRef, useState } from 'react';
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
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { Divider, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
    handleActiveQuestion,
    handleChangeDescriptionQuestion,
    handleChangeQuestion,
    handleChangeQuestionType,
    handleDuplicateQuestion,
    handleInsertQuestion,
    handleSetNewQuestion,
    handleSetQuestion,
} from '../../redux/slice/survey';
import ShortTextIcon from '@mui/icons-material/ShortText';
import NotesIcon from '@mui/icons-material/Notes';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import useChangeQuestionMutation from './mutation/changeQuestion';
import useAddQuestionMutation from './mutation/addQuestion';
import useDuplicateQuestionMutation from './mutation/duplicateQuestion';
import useAutoSave from '../../hooks/useAutoSave';

const cx = classNames.bind(style);

interface Props {
    index: number;
}
const Question = ({ index }: Props) => {
    const question = useAppSelector((state) => state.survey.questions[index]);
    const indexActiveQuestion = useAppSelector((state) => state.survey.indexActiveQuestion);
    const isEdit = useAppSelector((state) => state.survey.isEdit);
    const [isDuplicated, setDuplicated] = useState(false);
    const isActiveQuestion = index === indexActiveQuestion;
    const dispatchApp = useAppDispatch();
    const changeQuestion = useChangeQuestionMutation(question?.id || '');
    const DuplicateQuestionMutation = useDuplicateQuestionMutation(question.id);

    const handleDuplicateThisQuestion = () => {
        dispatchApp(
            handleDuplicateQuestion({
                indexQuestion: index,
            }),
        );
        setDuplicated(false);
        DuplicateQuestionMutation.mutateAsync(
            {
                questionId: question.id,
            },
            {
                onSuccess: (data, variables, context) => {
                    dispatchApp(
                        handleSetNewQuestion({
                            indexQuestion: index + 1,
                            newQuestion: data,
                        }),
                    );
                },
            },
        );
    };
    useEffect(() => {
        if (isDuplicated) {
            handleDuplicateThisQuestion();
        }
    }, [isDuplicated]);

    useAutoSave(question.description, () => {
        changeQuestion.mutate(
            {
                id: question.id,
                description: question.description,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    });
    useAutoSave(question.question, () => {
        changeQuestion.mutate(
            {
                id: question.id,
                question: question.question,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    });

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

    const AddQuestionMutation = useAddQuestionMutation(question.id);
    const handleInsertNewQuestion = (position: number, position2: 'before' | 'after') => {
        if (!isEdit) return;
        dispatchApp(
            handleInsertQuestion({
                position,
            }),
        );

        AddQuestionMutation.mutate(
            {
                currentQuestionId: question.id,
                position: position2,
            },
            {
                onSuccess(data, variables, context) {
                    dispatchApp(
                        handleSetNewQuestion({
                            indexQuestion: position,
                            newQuestion: data,
                        }),
                    );
                },
            },
        );
    };
    const heading = question?.questionType !== QuestionType.Description ? 'Câu hỏi' : 'Tiêu đề';

    const handleChangeNewQuestionType = (e: SelectChangeEvent) => {
        if (!isEdit) return;
        const questionType = e.target.value as QuestionType;
        dispatchApp(
            handleChangeQuestionType({
                index,
                questionType,
            }),
        );
        changeQuestion.mutate(
            {
                id: question.id,
                questionType: questionType,
            },

            {
                onSuccess(data, variables, context) {
                    dispatchApp(
                        handleSetQuestion({
                            questionType,
                            indexQuestion: index,
                            newQuestion: data,
                        }),
                    );
                },
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    };
    const handleChangeDescription = (value: string) => {
        dispatchApp(handleChangeDescriptionQuestion({ indexQuestion: index, description: value }));
    };

    return (
        <div className={cx('wrapper')} ref={myRef}>
            {isActiveQuestion && (
                <div className={cx('add', 'before')} onClick={() => handleInsertNewQuestion(index, 'before')}>
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
                                onChange={(e) => {
                                    if (!isEdit) return;
                                    dispatchApp(
                                        handleChangeQuestion({
                                            indexQuestion: index,
                                            question: e.target.value,
                                        }),
                                    );
                                }}
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

                    {index === indexActiveQuestion && (
                        <div>
                            <Select
                                onChange={handleChangeNewQuestionType}
                                value={question?.questionType}
                                MenuProps={{ disablePortal: true }}
                                slotProps={{
                                    root: {
                                        sx: {
                                            p: 0,
                                            '.MuiSelect-select': {
                                                width: 190,

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

                                <MenuItem value={QuestionType.LinearScale}>
                                    <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                                        <div style={{ width: '30px', display: 'flex', alignItems: 'center' }}>
                                            <LinearScaleIcon style={{ fontSize: '24px' }} />
                                        </div>

                                        <span style={{ marginLeft: '12px' }}>Thang đo</span>
                                    </div>
                                </MenuItem>
                                <MenuItem value={QuestionType.RadioButtonGrid}>
                                    <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                                        <div style={{ width: '30px', display: 'flex', alignItems: 'center' }}>
                                            <DragIndicatorRoundedIcon style={{ fontSize: '24px' }} />
                                        </div>

                                        <span style={{ marginLeft: '12px' }}>Multiple Choice Grid</span>
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
                    )}
                </div>
                {question?.isHasDescription && question?.questionType !== QuestionType.Description && (
                    <QuestionTextInput
                        placeholder={'Mô tả'}
                        value={question.description}
                        onChange={(e) => {
                            if (!isEdit) return;
                            handleChangeDescription(e.target.value);
                        }}
                        isActiveQuestion={isActiveQuestion}></QuestionTextInput>
                )}

                {question?.questionType === QuestionType.ShortAnswer && <QuestionShortAnswer indexQuestion={index} />}
                {question?.questionType === QuestionType.Paragraph && <QuestionParagraph indexQuestion={index} />}
                {question?.questionType === QuestionType.Dropdown && (
                    <QuestionDropDown isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}
                {question?.questionType === QuestionType.Checkbox && (
                    <QuestionCheckbox isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}
                {question?.questionType === QuestionType.RadioButton && (
                    <QuestionRadioButton isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}
                {question?.questionType === QuestionType.LinearScale && (
                    <QuestionLinearScale isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}
                {question?.questionType === QuestionType.Description && (
                    <Description isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}

                {question?.questionType === QuestionType.RadioButtonGrid && (
                    <QuestionRadioButtonGrid isActiveQuestion={isActiveQuestion} indexQuestion={index} />
                )}

                {isActiveQuestion && (
                    <BottomQuestion type={question?.questionType} indexQuestion={index} setDuplicated={setDuplicated} />
                )}
            </div>

            {isActiveQuestion && (
                <div className={cx('add', 'after')} onClick={() => handleInsertNewQuestion(index + 1, 'after')}>
                    <div className={cx('separate')}></div>
                    <IoIosAddCircleOutline className={cx('icon')} />
                    <div className={cx('separate')}></div>
                </div>
            )}
        </div>
    );
};

export default memo(Question);
