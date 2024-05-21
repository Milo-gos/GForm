import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import API from '../../utils/api';
import { setLoading } from './global';
import { error } from 'console';

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
            console.log(error);
            thunkAPI.dispatch(setLoading(false));
            throw new Error(error.response?.data?.message);
        }
    },
);

const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async (tokenLink: string, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {
            const response = await axios.get(
                `${API.VerifyEmail.endPoint}/${tokenLink}`,
            );
            thunkAPI.dispatch(setLoading(false));
        } catch (error: any) {
            console.log(error);
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
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.errorEmail = '';
            state.isRegister = true;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.errorEmail = action.error.message || '';
        });

        // Verify email
        builder.addCase(verifyEmail.fulfilled, (state, action) => {
            state.verifiedStatus = 'success';
        });
        builder.addCase(verifyEmail.rejected, (state, action) => {
            state.verifiedStatus = 'failed';
            console.log(action.error.message || '');
        });
    },
});

export default authSlice.reducer;
export { registerUser, verifyEmail };
export const { setErrorEmail } = authSlice.actions;
