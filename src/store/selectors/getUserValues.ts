import {createSelector} from "@reduxjs/toolkit";
import {getUser} from "./getUser";
import {UserSliceSchema} from "@/store/reducers/UserSliceSchema";
export const getUserAuth = createSelector(
    getUser,
    (search: UserSliceSchema) => search.isAuth,
);

export const getUserRole = createSelector(
    getUser,
    (search: UserSliceSchema) => search.role,
);

export const getUserLoginError = createSelector(
    getUser,
    (user: UserSliceSchema) => user.loginError,
);
