import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import API from '../../utils/api';
import { setLoading } from './global';
import Survey from '../../utils/interfaces/survey';
import QuestionType from '../../utils/interfaces/questionType';

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
        setNewSurvey: (state) => {
            state.title = '';
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
        activeQuestion: (state, action) => {
            state.indexActiveQuestion = action.payload;
        },
        insertQuestion: (state, action) => {
            // const nextState = [...state.questions];
            // nextState.splice(action.payload, 0, {
            //     id: new Date().getTime().toString(),
            //     isHasDescription: false,
            //     question: '',
            //     description: '',
            //     isRequired: false,
            //     questionType: QuestionType.ShortAnswer,
            //     isValidation: false,
            // });

            // state.questions = nextState;
            // state.indexActiveQuestion = action.payload;

            state.questions.splice(action.payload, 0, {
                id: new Date().getTime().toString(),
                isHasDescription: false,
                question: '',
                description: '',
                isRequired: false,
                questionType: QuestionType.ShortAnswer,
                isValidation: false,
            });
            state.indexActiveQuestion = action.payload;
        },
        toggleDescription: (state, action) => {
            const currentState = state.questions[action.payload].isHasDescription;
            state.questions[action.payload].isHasDescription = !currentState;
        },
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter((question, index) => index !== action.payload);
        },
    },
});

export default surveySlice.reducer;
export {};
export const { setNewSurvey, activeQuestion, insertQuestion, toggleDescription, deleteQuestion } = surveySlice.actions;
