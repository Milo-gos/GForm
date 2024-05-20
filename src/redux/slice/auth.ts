import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
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
interface InitState {
    currentUser: User | null;
    errorEmail: string;
    isRegister: boolean;
    verifiedStatus: string;
}
const initialState: InitState = {
    currentUser: null,
    errorEmail: '',
    isRegister: false,
    verifiedStatus: '',
};

const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (user: UserRequest, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {
            const response = await axios.post(API.RegisterUser.endPoint, user);
            thunkAPI.dispatch(setLoading(false));
            return response.data.data;
        } catch (error: any) {
            thunkAPI.dispatch(setLoading(false));
            throw new Error(error.response?.data);
        }
    },
);

const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {
            const response = await axios.get(API.VerifyEmail.endPoint);
            thunkAPI.dispatch(setLoading(false));
            return response.data.data;
        } catch (error: any) {
            thunkAPI.dispatch(setLoading(false));
            throw new Error(error.response?.data);
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setErrorEmail: (state, action) => {
            state.errorEmail = '';
        },
    },
    extraReducers: (builder) => {
        // register
        builder.addCase(
            registerUser.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.currentUser = action.payload;
                state.errorEmail = '';
                state.isRegister = true;
            },
        );
        builder.addCase(registerUser.rejected, (state, error) => {
            state.errorEmail = error.error.message || '';
        });

        // Verify email
        builder.addCase(
            verifyEmail.fulfilled,
            (state, action: PayloadAction<boolean>) => {
                state.verifiedStatus = 'success';
            },
        );
        builder.addCase(verifyEmail.rejected, (state, error) => {
            state.verifiedStatus = 'failed';
            console.log(error.error.message || '');
        });
    },
});

export default authSlice.reducer;
export { registerUser, verifyEmail };
export const {} = authSlice.actions;
