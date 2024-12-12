import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserSliceActions } from '../reducers/UserSlice';
import {ThunkConfig} from "@/store/config/StateSchema";
import {USER_ACCESS_TOKEN_KEY} from "@/const/localStorage";


export const FetchAvailibleDates = createAsyncThunk<Date[], string, ThunkConfig<string>>(
    '/fetchAvailibleDates',
    async (date, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        const token = localStorage.getItem(USER_ACCESS_TOKEN_KEY) || ''

        try {
            const response = await extra.api.get(`/reservation?date=${date}`, {
                headers: {'Auth': `Bearer ${token}`}
            });

            if (!response.data) {
                console.log('error');
                throw new Error();
            }

            dispatch(UserSliceActions.setAvailibleDatas(response.data))

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('server error');
        }
    },
);
