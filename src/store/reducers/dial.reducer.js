// src/store/apiSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { sendDialData } from '../actions/dial.action';
// Async thunk for API call


// Slice
const apiDialReducer = createSlice({
    name: 'api',
    initialState: {
        loading: false,
        error: null,
        data: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendDialData.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(sendDialData.fulfilled, (state) => {
                state.loading = false;
                state.data = action.payload
            })
            .addCase(sendDialData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default apiDialReducer.reducer;
