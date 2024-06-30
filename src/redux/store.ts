import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
    authReducer,
    globalReducer,
    responseReducer,
    submitFormReducer,
    surveyManagementReducer,
    surveyReducer,
} from './slice';

const store = configureStore({
    reducer: {
        global: globalReducer,
        auth: authReducer,
        survey: surveyReducer,
        submitForm: submitFormReducer,
        response: responseReducer,
        surveyManagement: surveyManagementReducer,
    },
});

// store.subscribe(() => {
//     console.log(store.getState());
// });
export default store;

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
