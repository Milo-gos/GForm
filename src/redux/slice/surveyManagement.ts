import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchString: '',
};
const surveyManagementSlice = createSlice({
    name: 'surveyManagement',
    initialState,
    reducers: {
        setSearchString: (state, action) => {
            state.searchString = action.payload;
        },
    },
});

export default surveyManagementSlice.reducer;
export const { setSearchString } = surveyManagementSlice.actions;
