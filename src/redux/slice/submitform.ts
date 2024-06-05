import { Draft, createSlice } from '@reduxjs/toolkit';
import SurveyInterface from '../../utils/interfaces/survey';
import SubmitFormInterface from '../../utils/interfaces/submitForm';
import AnswerInterface from '../../utils/interfaces/answer';
import QuestionType from '../../utils/interfaces/questionType';

const initialState: SubmitFormInterface = {
    id: '',
    title: '',
    description: '',
    status: 'draft',
    questions: [],
    errorQuestions: [],
    response: undefined,
    isSubmit: false,
};
const submitFormSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {
        setSurveySubmit: (state, action) => {
            const { survey } = action.payload;
            state.id = survey.id;
            state.title = survey.title;
            state.description = survey.description;
            state.questions = survey.questions;
            state.errorQuestions = state.questions.map((i) => '');
            state.response = {
                answers: state.questions.map((question, index) => {
                    const newAnswer: AnswerInterface = {
                        questionId: question.id || '',
                    };
                    return newAnswer;
                }),
            };
        },
        setErrorQuestion: (state, action) => {
            const { indexQuestion, errorMessage } = action.payload;
            state.errorQuestions[indexQuestion] = errorMessage;
        },
        setSubmitForm: (state, action) => {
            const { isSubmit } = action.payload;
            state.isSubmit = isSubmit;
        },
        setChangeAnswerText: (state, action) => {
            const { indexQuestion, answerText } = action.payload;
            state.response!.answers[indexQuestion].answerText = answerText;
        },
        setOption: (state, action) => {
            const { indexQuestion, value } = action.payload;
            if (value !== 'Other') {
                state.response!.answers[indexQuestion].singleOption = value;
            } else state.response!.answers[indexQuestion].isChooseOther = true;
        },
        setLinearValue: (state, action) => {
            const { indexQuestion, value } = action.payload;
            state.response!.answers[indexQuestion].linearValue = Number(value);
        },
        setOtherText: (state, action) => {
            const { indexQuestion, otherText } = action.payload;
            state.response!.answers[indexQuestion].otherText = otherText;
        },
        setMultipleOption: (state, action) => {
            const { indexQuestion, value } = action.payload;
            if (!state.response!.answers[indexQuestion].multiChooseOption) {
                state.response!.answers[indexQuestion].multiChooseOption = [];
            }
            const listOptionId = state.response!.answers[indexQuestion].multiChooseOption?.map((i) => i);
            if (!listOptionId?.includes(value)) {
                state.response!.answers[indexQuestion].multiChooseOption?.push(value);
            } else
                state.response!.answers[indexQuestion].multiChooseOption = state.response!.answers[
                    indexQuestion
                ].multiChooseOption?.filter((i) => i !== value);
        },
        setChooseOther: (state, action) => {
            const { indexQuestion } = action.payload;
            const isChooseOther = state.response!.answers[indexQuestion].isChooseOther ?? false;
            const nextState = !isChooseOther;
            state.response!.answers[indexQuestion].isChooseOther = nextState;
            if (nextState == false) {
                state.response!.answers[indexQuestion].otherText = '';
            }
        },
        setMultiChooseGColumn: (state, action) => {
            const { indexQuestion, indexRow, value } = action.payload;
            if (!state.response!.answers[indexQuestion].multiChooseGrid) {
                state.response!.answers[indexQuestion].multiChooseGrid = state.questions[indexQuestion].rows?.map(
                    (i) => ({
                        row: i.rowContent,
                    }),
                );
            }
            state.response!.answers[indexQuestion].multiChooseGrid![indexRow].gcolumn = value;
        },
    },
});

export default submitFormSlice.reducer;
export const {
    setSurveySubmit,
    setErrorQuestion,
    setSubmitForm,
    setChangeAnswerText,
    setOption,
    setOtherText,
    setMultipleOption,
    setChooseOther,
    setLinearValue,
    setMultiChooseGColumn,
} = submitFormSlice.actions;
