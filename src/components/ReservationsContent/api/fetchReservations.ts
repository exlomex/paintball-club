import { rtkApi } from '@/api/RtkApi'
import {ReservationInterface} from "@/components/PlanBooking/api/MakeReservation";

const extendedApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        fetchReservations: build.query<ReservationInterface[], null>({
            query: () => ({
                url: `/reservation/my`,
            }),
            providesTags: ['Reservation']
        }),

    }),
})

export const useFetchReservations = extendedApi.useFetchReservationsQuery
