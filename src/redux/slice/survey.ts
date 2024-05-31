import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import API from '../../utils/api';
import { setLoading } from './global';
import Survey from '../../utils/interfaces/survey';
import QuestionType from '../../utils/interfaces/questionType';
import { useMutation } from '@tanstack/react-query';
import useChangeQuestionMutation from '../../components/Question/mutation/changeQuestion';
import QuestionInterface from '../../utils/interfaces/question';

const initialState: Survey = {
    id: '',
    title: '',
    description: '',
    status: 'draft',
    questions: [],
    indexActiveQuestion: 0,
};

const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        setSurvey: (state, action) => {
            const { survey } = action.payload;
            state.id = survey.id;
            state.title = survey.title;
            state.description = survey.description;
            state.questions = survey.questions;
            state.indexActiveQuestion = 0;
        },
        setNewSurvey: (state) => {
            state.title = 'Tiêu đề khảo sát';
            state.description = '';
            state.status = 'draft';
            state.questions = [
                {
                    id: new Date().getTime().toString(),
                    isHasDescription: false,
                    question: '',
                    description: '',
                    isRequired: false,
                    questionType: QuestionType.ShortAnswer,
                    isValidation: false,
                },
            ];
        },
        handleActiveQuestion: (state, action) => {
            const { indexQuestion } = action.payload;
            state.indexActiveQuestion = indexQuestion;
        },
        handleInsertQuestion: (state, action) => {
            const { position } = action.payload;
            state.questions.splice(position, 0, {
                id: new Date().getTime().toString(),
                isHasDescription: false,
                question: '',
                description: '',
                isRequired: false,
                questionType: QuestionType.ShortAnswer,
                isValidation: false,
            });
            state.indexActiveQuestion = position;
        },
        handleDuplicateQuestion: (state, action) => {
            const { indexQuestion } = action.payload;
            const newQuestion = { ...state.questions[indexQuestion], id: new Date().getTime().toString() };
            state.questions.splice(indexQuestion + 1, 0, newQuestion);
            state.indexActiveQuestion = indexQuestion + 1;
        },

        handleToggleDescription: (state, action) => {
            const { indexQuestion } = action.payload;
            const nextState = !state.questions[indexQuestion].isHasDescription;
            state.questions[indexQuestion].isHasDescription = nextState;
            if (nextState === false) state.questions[indexQuestion].description = '';
        },
        handleDeleteQuestion: (state, action) => {
            const { indexQuestion } = action.payload;

            if (indexQuestion === 0) {
                if (state.questions.length === 1) state.indexActiveQuestion = indexQuestion - 1;
                else state.indexActiveQuestion = indexQuestion;
            } else {
                state.indexActiveQuestion = indexQuestion - 1;
            }

            state.questions = state.questions.filter((question, index) => index !== indexQuestion);
        },
        handleChangeQuestionType: (state, action) => {
            const { index, questionType } = action.payload;
            state.questions[index].questionType = questionType;
            resetQuestion(state, index, questionType);
        },
        handleChangeOptionText: (
            state,
            action: PayloadAction<{ indexQuestion: number; indexOption: number; optionText: string }>,
        ) => {
            const { indexQuestion, indexOption, optionText } = action.payload;

            state.questions[indexQuestion]!.options![indexOption].optionText = optionText;
        },
        handleAddOption: (state, action: PayloadAction<{ indexQuestion: number }>) => {
            const { indexQuestion } = action.payload;
            state.questions[indexQuestion]?.options?.push({
                optionText: `Lựa chọn ${state.questions[indexQuestion]?.options!.length + 1}`,
            });
        },
        handleRemoveOption: (state, action: PayloadAction<{ indexQuestion: number; indexOption: number }>) => {
            const { indexQuestion, indexOption } = action.payload;

            state.questions[indexQuestion]?.options?.splice(indexOption, 1);
        },
        handleChangeTitle: (state, action) => {
            const { title } = action.payload;
            state.title = title;
        },
        handleChangeDescription: (state, action) => {
            const { description } = action.payload;
            state.description = description;
        },
        handleChangeDescriptionQuestion: (state, action) => {
            const { indexQuestion, description } = action.payload;
            state.questions[indexQuestion].description = description;
        },
        handleChangeQuestion: (state, action) => {
            const { indexQuestion, question } = action.payload;
            state.questions[indexQuestion].question = question;
        },
        handleSetHasOther: (state, action) => {
            const { indexQuestion, isHasOther } = action.payload;
            state.questions[indexQuestion].isHasOther = isHasOther;
        },
        handleChangeRequired: (state, action) => {
            const { indexQuestion, isRequired } = action.payload;
            state.questions[indexQuestion].isRequired = isRequired;
        },
        handleSetQuestion: (state, action) => {
            const { questionType, indexQuestion, newQuestion } = action.payload;
            state.questions[indexQuestion] = { ...state.questions[indexQuestion], ...newQuestion };
            resetQuestion2(state, indexQuestion, questionType, newQuestion);
        },
        handleChangeLinear: (state, action) => {
            const { min, max, indexQuestion, leftLabel, rightLabel } = action.payload;

            if (min !== undefined) {
                state.questions[indexQuestion].linearScale!.min = min;
            }
            if (max !== undefined) {
                state.questions[indexQuestion].linearScale!.max = max;
            }
            if (leftLabel) {
                state.questions[indexQuestion].linearScale!.leftLabel = leftLabel;
            }
            if (rightLabel) {
                state.questions[indexQuestion].linearScale!.rightLabel = rightLabel;
            }
        },
        handleSetOption: (state, action) => {
            const { indexQuestion, option } = action.payload;
            const lastIndex = state.questions[indexQuestion].options!.length - 1;
            state.questions[indexQuestion].options![lastIndex].id = option.id;
        },
    },
});

const resetQuestion = (state: Draft<Survey>, index: number, questionType: QuestionType) => {
    switch (questionType) {
        case QuestionType.ShortAnswer:
        case QuestionType.Paragraph:
            state.questions[index].isValidation = false;
            state.questions[index].validation = undefined;
            state.questions[index].linearScale = undefined;
            state.questions[index].rows = undefined;
            state.questions[index].columns = undefined;
            state.questions[index].options = undefined;
            state.questions[index].isHasOther = undefined;
            break;
        case QuestionType.Checkbox:
        case QuestionType.RadioButton:
            state.questions[index].isValidation = false;
            state.questions[index].validation = undefined;
            state.questions[index].linearScale = undefined;
            state.questions[index].rows = undefined;
            state.questions[index].columns = undefined;
            if (!state.questions[index].options || state.questions[index].options?.length === 0) {
                state.questions[index].options = [
                    {
                        optionText: 'Lựa chọn 1',
                    },
                ];
            }

            break;
        case QuestionType.Dropdown:
            state.questions[index].isValidation = false;
            state.questions[index].validation = undefined;
            state.questions[index].linearScale = undefined;
            state.questions[index].rows = undefined;
            state.questions[index].columns = undefined;
            state.questions[index].isHasOther = false;
            if (!state.questions[index].options || state.questions[index].options?.length === 0) {
                state.questions[index].options = [
                    {
                        optionText: 'Lựa chọn 1',
                    },
                ];
            }
            break;
        case QuestionType.LinearScale:
            state.questions[index].isValidation = false;
            state.questions[index].validation = undefined;
            state.questions[index].rows = undefined;
            state.questions[index].columns = undefined;
            state.questions[index].options = undefined;
            state.questions[index].isHasOther = false;
            state.questions[index].linearScale = {
                min: 1,
                max: 5,
                leftLabel: '',
                rightLabel: '',
            };
            break;
        case QuestionType.RadioButtonGrid:
            state.questions[index].isValidation = false;
            state.questions[index].validation = undefined;
            state.questions[index].options = undefined;
            state.questions[index].linearScale = undefined;
            state.questions[index].isHasOther = false;
            state.questions[index].rows = [
                {
                    rowContent: 'Hàng 1',
                },
            ];
            state.questions[index].columns = [
                {
                    columnContent: 'Cột 1',
                },
            ];
            break;
        case QuestionType.Description:
            state.questions[index].isValidation = false;
            state.questions[index].validation = undefined;
            state.questions[index].linearScale = undefined;
            state.questions[index].rows = undefined;
            state.questions[index].columns = undefined;
            state.questions[index].options = undefined;
            state.questions[index].isHasOther = undefined;
            state.questions[index].isHasDescription = true;
            break;
    }
};
const resetQuestion2 = (
    state: Draft<Survey>,
    index: number,
    questionType: QuestionType,
    newQuestion: QuestionInterface,
) => {
    switch (questionType) {
        case QuestionType.Checkbox:
        case QuestionType.Dropdown:
        case QuestionType.RadioButton:
            state.questions[index].options![0].id = newQuestion.options![0].id;
            break;
        case QuestionType.LinearScale:
            state.questions[index].linearScale!.id = newQuestion.linearScale?.id;
            break;
        case QuestionType.RadioButtonGrid:
            state.questions[index].isValidation = false;
            state.questions[index].validation = undefined;
            state.questions[index].options = undefined;
            state.questions[index].linearScale = undefined;
            state.questions[index].isHasOther = false;
            state.questions[index].rows = [
                {
                    rowContent: 'Hàng 1',
                },
            ];
            state.questions[index].columns = [
                {
                    columnContent: 'Cột 1',
                },
            ];
            break;
    }
};

export default surveySlice.reducer;
export {};
export const {
    setSurvey,
    setNewSurvey,
    handleActiveQuestion,
    handleInsertQuestion,
    handleDuplicateQuestion,
    handleToggleDescription,
    handleDeleteQuestion,
    handleChangeQuestionType,
    handleChangeOptionText,
    handleAddOption,
    handleRemoveOption,
    handleChangeTitle,
    handleChangeDescription,
    handleChangeDescriptionQuestion,
    handleChangeQuestion,
    handleSetHasOther,
    handleChangeRequired,
    handleSetQuestion,
    handleChangeLinear,
    handleSetOption,
} = surveySlice.actions;
