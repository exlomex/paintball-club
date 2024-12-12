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

export const getUserIsModalOpen = createSelector(
    getUser,
    (search: UserSliceSchema) => search.modalIsOpen,
);
export const getUserCurrentPlanInfo = createSelector(
    getUser,
    (search: UserSliceSchema) => search.currentPlanInfo,
);

export const getUserActiveDate = createSelector(
    getUser,
    (search: UserSliceSchema) => search.activeDate,
);

export const getUserAvailibleDatas = createSelector(
    getUser,
    (search: UserSliceSchema) => search.availibleDatas,
);

export const getUserSelectedTime = createSelector(
    getUser,
    (search: UserSliceSchema) => search.selectedTime,
);

export const getUserCurrentPlanId = createSelector(
    getUser,
    (plan: UserSliceSchema) => plan.currentPlanInfo?.id,
);

export const getUserAvailibleDatasLoading = createSelector(
    getUser,
    (user: UserSliceSchema) => user.availibleDatasLoading
);