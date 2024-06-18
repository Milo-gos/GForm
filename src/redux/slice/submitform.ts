import { createSlice } from '@reduxjs/toolkit';
import SubmitFormInterface from '../../utils/interfaces/submitForm';
import AnswerInterface from '../../utils/interfaces/answer';

const initialState: SubmitFormInterface = {
    id: '',
    title: '',
    description: '',
    questions: [],
    errorQuestions: [],
    infoSubmit: undefined,
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
            state.infoSubmit = {
                surveyId: survey.id,
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
            state.infoSubmit!.answers[indexQuestion].answerText = answerText;
            if (answerText !== '') {
                if (state.errorQuestions[indexQuestion]) {
                    state.errorQuestions[indexQuestion] = '';
                }
            }
        },
        setOption: (state, action) => {
            const { indexQuestion, value } = action.payload;
            state.infoSubmit!.answers[indexQuestion].singleOption = value;
            state.infoSubmit!.answers[indexQuestion].isChooseOther = false;
            state.infoSubmit!.answers[indexQuestion].otherText = '';
            state.errorQuestions[indexQuestion] = '';
        },
        setLinearValue: (state, action) => {
            const { indexQuestion, value } = action.payload;
            state.infoSubmit!.answers[indexQuestion].linearValue = Number(value);
            state.errorQuestions[indexQuestion] = '';
        },
        setOtherText: (state, action) => {
            const { indexQuestion, otherText } = action.payload;
            state.infoSubmit!.answers[indexQuestion].otherText = otherText;
        },
        setMultipleOption: (state, action) => {
            const { indexQuestion, value } = action.payload;
            if (!state.infoSubmit!.answers[indexQuestion].multiChooseOption) {
                state.infoSubmit!.answers[indexQuestion].multiChooseOption = [];
            }
            const listOptionId = state.infoSubmit!.answers[indexQuestion].multiChooseOption?.map((i) => i);
            if (!listOptionId?.includes(value)) {
                state.infoSubmit!.answers[indexQuestion].multiChooseOption?.push(value);
                state.errorQuestions[indexQuestion] = '';
            } else {
                state.infoSubmit!.answers[indexQuestion].multiChooseOption = state.infoSubmit!.answers[
                    indexQuestion
                ].multiChooseOption?.filter((i) => i !== value);
            }
            if (
                state.infoSubmit!.answers[indexQuestion].multiChooseOption?.length === 0 &&
                !state.infoSubmit!.answers[indexQuestion].isChooseOther
            ) {
                state.errorQuestions[indexQuestion] = 'Câu hỏi này là bắt buộc';
            } else state.errorQuestions[indexQuestion] = '';
        },
        setChooseOtherCheckbox: (state, action) => {
            const { indexQuestion } = action.payload;
            const isChooseOther = state.infoSubmit!.answers[indexQuestion].isChooseOther ?? false;
            const nextState = !isChooseOther;
            state.infoSubmit!.answers[indexQuestion].isChooseOther = nextState;
            if (nextState === false) {
                state.infoSubmit!.answers[indexQuestion].otherText = '';
            }

            if (
                (!state.infoSubmit!.answers[indexQuestion].multiChooseOption ||
                    state.infoSubmit!.answers[indexQuestion].multiChooseOption?.length === 0) &&
                nextState === false
            ) {
                state.errorQuestions[indexQuestion] = 'Câu hỏi này là bắt buộc';
            } else state.errorQuestions[indexQuestion] = '';
        },
        setChooseOtherRadiobutton: (state, action) => {
            const { indexQuestion } = action.payload;
            state.infoSubmit!.answers[indexQuestion].isChooseOther = true;
            state.infoSubmit!.answers[indexQuestion].otherText = '';
            state.infoSubmit!.answers[indexQuestion].singleOption = '';
        },
        setMultiChooseGColumn: (state, action) => {
            const { indexQuestion, indexRow, value } = action.payload;
            if (!state.infoSubmit!.answers[indexQuestion].multiChooseGrid) {
                state.infoSubmit!.answers[indexQuestion].multiChooseGrid = state.questions[indexQuestion].rows?.map(
                    (i) => ({
                        row: i.rowContent,
                    }),
                );
            }
            state.infoSubmit!.answers[indexQuestion].multiChooseGrid![indexRow].gcolumn = value;

            const isError = state.infoSubmit!.answers[indexQuestion].multiChooseGrid?.some((row) => !row.gcolumn);
            if (!isError) {
                state.errorQuestions[indexQuestion] = '';
            }
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
    setChooseOtherCheckbox,
    setChooseOtherRadiobutton,
    setLinearValue,
    setMultiChooseGColumn,
} = submitFormSlice.actions;
