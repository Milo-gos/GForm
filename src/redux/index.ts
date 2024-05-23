import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth';
import globalReducer from './slice/global';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
    reducer: {
        global: globalReducer,
        auth: authReducer,
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
