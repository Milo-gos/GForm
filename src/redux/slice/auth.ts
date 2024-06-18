import { createSlice } from '@reduxjs/toolkit';
import UserInterface from '../../utils/interfaces/user';

interface InitState {
    currentUser: UserInterface | null;
    errorEmailSignUp: string;
    errorEmailSignIn: string;
    errorPasswordSignIn: string;
}

const initialState: InitState = {
    currentUser: null,
    errorEmailSignUp: '',
    errorEmailSignIn: '',
    errorPasswordSignIn: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { setCurrentUser } = authSlice.actions;
