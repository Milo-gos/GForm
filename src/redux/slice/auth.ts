import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import API from '../../utils/api';
import { setLoading } from './global';
import { error } from 'console';
import { NavigateFunction } from 'react-router-dom';

interface User {
    fullName: string;
    email: string;
    password: string;
    id: string;
    isVerifiedEmail: string;
    isAdmin: string;
}
interface UserRequest {
    fullName: string;
    email: string;
    password: string;
}

interface UserSignIn {
    email: string;
    password: string;
}
interface InitState {
    currentUser: User | null;
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

const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ user, navigate }: { user: UserRequest; navigate: NavigateFunction }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {
            const response = await axios.post(API.RegisterUser.endPoint, user);
            thunkAPI.dispatch(setLoading(false));
            const tokenLinkPublic = response.data.data;
            navigate(`/email-verification/${tokenLinkPublic}`);
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setLoading(false));
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    },
);

const verifyEmailPublicLink = createAsyncThunk(
    'auth/verifyEmailPublicLink',
    async (tokenLinkPublic: string, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {
            await axios.get(`${API.VerifyEmailPublicLink.endPoint}/${tokenLinkPublic}`);
            thunkAPI.dispatch(setLoading(false));
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setLoading(false));
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    },
);
const verifyEmail = createAsyncThunk('auth/verifyEmail', async (tokenLink: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        await axios.get(`${API.VerifyEmail.endPoint}/${tokenLink}`);
        thunkAPI.dispatch(setLoading(false));
    } catch (error: any) {
        console.log(error);
        thunkAPI.dispatch(setLoading(false));
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

const signIn = createAsyncThunk('auth/signIn', async (user: UserSignIn, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const response = await axios.post(API.SignIn.endPoint, user);
        thunkAPI.dispatch(setLoading(false));
        return response.data.data;
    } catch (error: any) {
        console.log(error);
        thunkAPI.dispatch(setLoading(false));
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

const checkExistEmail = createAsyncThunk('auth/checkExistEmail', async (email: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const response = await axios.get(`${API.CheckExistEmail.endPoint}/${email}`);
        thunkAPI.dispatch(setLoading(false));
        return response.data.data;
    } catch (error: any) {
        console.log(error);
        thunkAPI.dispatch(setLoading(false));
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

// Lát làm
const resetPassword = createAsyncThunk('auth/resetPassword', async (password: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const response = await axios.post(API.ResetPassword.endPoint, { password });
        thunkAPI.dispatch(setLoading(false));
        return response.data.data;
    } catch (error: any) {
        console.log(error);
        thunkAPI.dispatch(setLoading(false));
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // register

        // sign in
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
    },
});

export default authSlice.reducer;
export { registerUser, verifyEmailPublicLink, verifyEmail, signIn, checkExistEmail, resetPassword };
export const {} = authSlice.actions;
