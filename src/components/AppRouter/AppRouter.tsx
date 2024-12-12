import {Navigate, Route, Routes} from 'react-router-dom';
import {MainPage} from "@/pages/MainPage";
import {RequireAuth} from "@/components/RequireAuth";
import {UserRoles} from "@/store/reducers/UserSliceSchema";
import {LoginPage} from "@/pages/LoginPage";
import {RegisterPage} from "@/pages/RegisterPage";
import {PlansPage} from "@/pages/PlansPage";
import {PlanPage} from "@/pages/PlanPage";
import {ReservationsPage} from "@/pages/ReservationsPage";

export const AppRouter = () => (
        <Routes>
            <Route path="/" element={
                <MainPage/>
            }/>
            <Route path="/login" element={
                <RequireAuth roles={[UserRoles.GUEST]}>
                    <LoginPage/>
                </RequireAuth>
            }/>
            <Route path="/register" element={
                <RequireAuth roles={[UserRoles.GUEST]}>
                    <RegisterPage/>
                </RequireAuth>
            }/>

            <Route path="/plans/:id" element={
                <PlanPage/>
            }/>

            <Route path="/plans" element={
                <PlansPage/>
            }/>

            <Route path="/reservations" element={
                <RequireAuth roles={[UserRoles.ADMIN, UserRoles.USER]}>
                    <ReservationsPage/>
                </RequireAuth>
            }/>
            <Route path="*" element={<Navigate to="/404page" replace />}/>
        </Routes>
);
