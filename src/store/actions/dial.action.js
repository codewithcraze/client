import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Twilio } from '../../config';

// Async thunk for API call using axios
export const sendDialData = createAsyncThunk(
    'api/sendData',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(Twilio, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
            debugger;
            
            // For debugging purposes

            return response.data; // Axios automatically parses the response as JSON
        } catch (error) {
            // Handle both request errors and response errors
            let errorMessage = 'Failed to send data';

            if (error.response) {
                // Server responded with a status code outside the 2xx range
                errorMessage = error.response.data?.message || errorMessage;
            } else if (error.request) {
                // Request was made but no response received
                errorMessage = 'No response received from the server';
            } else {
                // Other errors
                errorMessage = error.message;
            }

            return rejectWithValue(errorMessage);
        }
    }
);
