import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../utils/api';
import { setLoading } from './global';

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

const registerUser = createAsyncThunk('auth/registerUser', async (user: UserRequest, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        await axios.post(API.RegisterUser.endPoint, user);
        thunkAPI.dispatch(setLoading(false));
    } catch (error: any) {
        console.log(error);
        thunkAPI.dispatch(setLoading(false));
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

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

const verifyLinkResetPassword = createAsyncThunk(
    'auth/verifyLinkResetPassword',
    async (tokenLinkResetPassword: string, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {
            const response = await axios.get(`${API.VerifyLinkResetPassword.endPoint}/${tokenLinkResetPassword}`);
            thunkAPI.dispatch(setLoading(false));
            return thunkAPI.fulfillWithValue(response.data?.data);
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setLoading(false));
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    },
);

const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {
            const response = await axios.post(API.ResetPassword.endPoint, { email, password });
            thunkAPI.dispatch(setLoading(false));
            return response.data.data;
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setLoading(false));
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
    },
});

export default authSlice.reducer;
export {
    registerUser,
    verifyEmailPublicLink,
    verifyEmail,
    signIn,
    checkExistEmail,
    resetPassword,
    verifyLinkResetPassword,
};
export const {} = authSlice.actions;
