import { rtkApi } from '@/api/RtkApi'


const extendedApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAvailibleDates: build.query<Date[], {date: string}>({
            query: ({date}) => ({
                url: `/reservation?date=${date}`
            }),
            providesTags: []
        }),

    }),
})

export const useFetchAvailibleDates = extendedApi.useFetchAvailibleDatesQuery
export const useLazyFetchAvailibleDates = extendedApi.useLazyFetchAvailibleDatesQuery
