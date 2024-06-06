import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {};
const responseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {},
});

export default responseSlice.reducer;
export const {} = responseSlice.actions;
