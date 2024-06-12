import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../utils/api';
import { setLoading } from './global';
import UserInterface from '../../utils/interfaces/user';

interface UserRequest {
    fullName: string;
    email: string;
    password: string;
}

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
