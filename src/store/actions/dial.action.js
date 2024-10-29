import { createAsyncThunk } from '@reduxjs/toolkit';   
import { Twilio } from '../../config';


export const sendDialData = createAsyncThunk(
    'dial/sendData',
    async (data) => {
        const response = await fetch(Twilio, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to send data');
        }
        return await response.json();
    }
);
