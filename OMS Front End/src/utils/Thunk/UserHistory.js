import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IsProdMode, IsTestMode } from "../API/fetchBaseQuery";

const liveURL = ''
const testURL = process.env.REACT_APP_TESTURLS
const localHost = process.env.REACT_APP_LOCALURLS

const APIUrl = (IsProdMode) ? liveURL : (IsTestMode) ? testURL : localHost;


// Define the async thunk for logging user login/logout history
export const logUserLoginLogoutHistory = createAsyncThunk('auth/logUserLoginLogoutHistory', async ({ userId, isLogin }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${APIUrl}/Authentication/AddUserLoginLogoutHistory`, {
            userId,
            isLogin
        });
        return response.data;
    } catch (error) {
        // Handle any errors here
        return rejectWithValue(error.response.data);
    }
}
);
