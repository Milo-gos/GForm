import { createSlice } from '@reduxjs/toolkit';

interface InitInterface {
    colorsChart: string[];
}
const initialState: InitInterface = {
    colorsChart: [],
};
const responseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {},
});

export default responseSlice.reducer;
export const {} = responseSlice.actions;
