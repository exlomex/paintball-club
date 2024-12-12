import {rtkApi} from "@/api/RtkApi";

export interface reservationBodyI {
    "gamePlanId": number,
    "gameTime": string
}

export interface ReservationInterface {
    id: number;
    time: string;
    gamePlan: {
        id: number,
        price: number,
        description: string;
    }
}

const injectEndpoints = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        makeReservation: build.mutation<ReservationInterface[], reservationBodyI>({
            query: (body) => ({
                url: '/reservation',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Reservation'],
        }),
    }),
});

export const useMakeReservation = injectEndpoints.useMakeReservationMutation
