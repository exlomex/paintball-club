import { classNames } from '@/lib/classNames';
import cls from './PlanBooking.module.scss';
import {useSelector} from "react-redux";
import {
    getUserActiveDate,
    getUserAvailibleDatas, getUserAvailibleDatasLoading, getUserCurrentPlanId,
    getUserCurrentPlanInfo, getUserSelectedTime,
} from "@/store/selectors/getUserValues";
import React from "react";
import {Calendar} from "@/components/Calendar";
import {Button} from "@/components/ui/Button";
import {ReactComponent as CloseIcon} from "@/assets/closeIcon.svg";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {UserSliceActions} from "@/store/reducers/UserSlice";
import { reservationBodyI, useMakeReservation} from "@/components/PlanBooking/api/MakeReservation";
import {format, parseISO} from "date-fns";
import {useNavigate} from "react-router-dom";

interface PlanBookingProps {
    className?: string;
}

export const PlanBooking = (props: PlanBookingProps) => {
    const { className } = props;

    const plan = useSelector(getUserCurrentPlanInfo)

    const dispatch = useAppDispatch()
    const onCloseButtonClick = () => {
        dispatch(UserSliceActions.setModalIsOpen(false))
    }

    function combineDateAndTime(activeDate: number, selectedTime: string) {
        const date = new Date(activeDate);
        const [hours, minutes] = selectedTime.split(':').map(Number);

        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date.getTime();
    }

    const availibleDatas = useSelector(getUserAvailibleDatas)
    const selectedData = useSelector(getUserActiveDate)

    const onClickAvailibleTimeHandler = (time: string) => () => {
        dispatch(UserSliceActions.setSelectedTime(combineDateAndTime(selectedData, time)))
    }

    const selectedTime = useSelector(getUserSelectedTime) || 0

    const [makeReservationTrigger, {data}] = useMakeReservation()

    const selectedPlanId = useSelector(getUserCurrentPlanId)
    const navigate = useNavigate()
    const onReservationClickHandler = async () => {
        try {
            const reservationBody: reservationBodyI = {
                gamePlanId: selectedPlanId || 0,
                gameTime: selectedTime > 0 ? format(new Date(selectedTime), "yyyy-MM-dd'T'HH:mm:ss") : ''
            }

            if (reservationBody.gamePlanId && reservationBody.gameTime) {
                await makeReservationTrigger(reservationBody).unwrap()
                dispatch(UserSliceActions.setModalIsOpen(false))
                await navigate('/reservations')
            }
        } catch (e) {}


    }

    const isTimeLoading = useSelector(getUserAvailibleDatasLoading)

    if (!plan) return (
        <></>
    )

    return (
        <div className={classNames(cls.PlanBooking, {}, [className])}>
            <div className={cls.PlanUpperLine}>
                <h2 className={cls.PlanTitle}>
                    <span>{plan.title.split(' ')[0]}</span>{plan.title.split(' ')[1]}
                </h2>

                <CloseIcon className={cls.CloseButton} onClick={onCloseButtonClick}/>
            </div>

            <Calendar/>

            <h2 className={cls.BookingTimeTitle}>Выбрать время</h2>

            <div className={classNames(cls.AvailibleDatas, {[cls.isLoading]: isTimeLoading}, [])}>
                {isTimeLoading && <span className={cls.loader}></span>}

                {!isTimeLoading && availibleDatas.map((data, index) => (
                    <div onClick={onClickAvailibleTimeHandler(data.substring(11, 16))}
                         className={classNames(cls.AvailibleData, {[cls.ActiveTime]: format(new Date(selectedTime), 'HH:mm') === format(parseISO(data), 'HH:mm')}, [])}
                         key={index}>{data.substring(11, 16)}</div>
                ))}
            </div>

            <Button onClick={onReservationClickHandler} fullWidth>Записаться</Button>
        </div>
    )
};
