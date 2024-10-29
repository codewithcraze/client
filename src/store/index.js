// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import apiDialReducer from './reducers/dial.reducer';

const store = configureStore({
    reducer: {
        api: apiDialReducer,
    },
});

export default store;
