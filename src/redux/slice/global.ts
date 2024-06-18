import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isOpenSnackbar: false,
    messageSnackbar: '',
};
const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setOpenSnackbar: (state, action) => {
            const { value, message } = action.payload;
            state.isOpenSnackbar = value;
            state.messageSnackbar = message;
        },
    },
});

export default globalSlice.reducer;
export const { setLoading, setOpenSnackbar } = globalSlice.actions;
