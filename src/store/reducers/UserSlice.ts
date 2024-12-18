import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {tokenInfoTypes, UserRoles, UserSliceSchema} from "./UserSliceSchema";
import {USER_ACCESS_TOKEN_KEY} from "@/const/localStorage";
import {jwtDecode} from "jwt-decode";
import {loginByUsername, UserData} from "../services/loginByUsername";
import {FetchAvailibleDates} from "@/store/services/fetchAvailibleDates";


const initialState: UserSliceSchema = {
    isAuth: false,
    role: UserRoles.GUEST,
    loginIsLoading: false,
    modalIsOpen: false,
    activeDate: Date.now(),
    availibleDatas: [],
    availibleDatasLoading: false
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state: UserSliceSchema, action: PayloadAction<UserData>) => {
            const accessToken = action.payload.accessToken
            state.isAuth = true;

            const tokenInfo: tokenInfoTypes = jwtDecode(accessToken || '')
            state.role = tokenInfo.role;

            localStorage.setItem(USER_ACCESS_TOKEN_KEY, accessToken);
        },
        logout: (state: UserSliceSchema) => {
            state.isAuth = false;
            state.role = UserRoles.GUEST;
            localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
        },
        initAuth: (state: UserSliceSchema) => {
            const token = localStorage.getItem(USER_ACCESS_TOKEN_KEY);
            if (token) {
                state.isAuth = true;

                const tokenInfo: tokenInfoTypes = jwtDecode(token || '')
                state.role = tokenInfo.role;
            }
        },
        setModalIsOpen: (state: UserSliceSchema, action: PayloadAction<boolean>) => {
            state.modalIsOpen = action.payload;
        },
        setCurrentPlanInfo: (state: UserSliceSchema, action: PayloadAction<{id: number, title: string, features: string[], price: number}>) => {
            state.currentPlanInfo = action.payload;
        },
        setActiveDate: (state: UserSliceSchema, action: PayloadAction<number>) => {
            state.activeDate = action.payload;
        },
        setAvailibleDatas: (state: UserSliceSchema, action: PayloadAction<string[]>) => {
            state.availibleDatas = action.payload;
        },
        setSelectedTime: (state: UserSliceSchema, action: PayloadAction<number>) => {
            state.selectedTime = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.loginError = undefined;
                state.loginIsLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.loginIsLoading = false;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.loginIsLoading = false;
                state.loginError = action.payload;
            })

            .addCase(FetchAvailibleDates.pending, (state) => {
                state.availibleDatasLoading = true;
            })
            .addCase(FetchAvailibleDates.fulfilled, (state) => {
                state.availibleDatasLoading = false;
            })
            .addCase(FetchAvailibleDates.rejected, (state, action) => {
                state.availibleDatasLoading = false;
            });
    },
});

export const { actions: UserSliceActions } = UserSlice;
export const { reducer: UserSliceReducer } = UserSlice;
