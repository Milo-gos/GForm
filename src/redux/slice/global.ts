import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};
const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export default globalSlice.reducer;
export const { setLoading } = globalSlice.actions;
