import {useState, useEffect, ReactElement, FC} from "react";
import cls from "./Calendar.module.scss";
import {useSelector} from "react-redux";
import {UserSliceActions} from "@/store/reducers/UserSlice";
import {getUserActiveDate} from "@/store/selectors/getUserValues";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {ReactComponent as RigthIcon} from "@/assets/rightIcon.svg";
import {ReactComponent as LeftIcon} from "@/assets/leftIcon.svg";
import {FetchAvailibleDates} from "@/store/services/fetchAvailibleDates";

export const Calendar: FC = () => {
    const storeDate = useSelector(getUserActiveDate)
    const activeDate = new Date(storeDate)
    const dispatch = useAppDispatch()
    const currentDate = new Date();

    const daysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();

    const startDayOfMonth = new Date(
        activeDate.getFullYear(),
        activeDate.getMonth(),
        1
    ).getDay();


    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleDayClick = (day: number): void => {
        dispatch(UserSliceActions.setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth(), day).getTime()))

        dispatch(UserSliceActions.setSelectedTime(0))
        dispatch(FetchAvailibleDates(formatDate(new Date(activeDate.getFullYear(), activeDate.getMonth(), day))))
    };

    const handlePrevMonth = (): void => {
        const newDate = new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1);
        if (newDate.getMonth() === currentDate.getMonth() && newDate.getFullYear() === currentDate.getFullYear()) {
            dispatch(UserSliceActions.setActiveDate(currentDate.getTime()))
        } else {
            dispatch(UserSliceActions.setActiveDate(newDate.getTime()))
        }
    };

    const handleNextMonth = (): void => {
        const newDate = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1);
        if (newDate.getMonth() === currentDate.getMonth() && newDate.getFullYear() === currentDate.getFullYear()) {
            dispatch(UserSliceActions.setActiveDate(currentDate.getTime()))
        } else {
            dispatch(UserSliceActions.setActiveDate(newDate.getTime()))
        }
    };

    const renderDays = (): ReactElement[] => {
        const days: ReactElement[] = [];
        const totalDays = daysInMonth(activeDate.getFullYear(), activeDate.getMonth());

        for (let i = 0; i < startDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className={cls.calendarDay + ' ' + cls.empty}></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const isActive =
                activeDate &&
                activeDate.getDate() === day &&
                activeDate.getMonth() === activeDate.getMonth() &&
                activeDate.getFullYear() === activeDate.getFullYear();

            days.push(
                <div
                    key={day}
                    className={`${cls.calendarDay} ${isActive ? cls.active : ""}`}
                    onClick={() => handleDayClick(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    useEffect(() => {
        if (activeDate) {
            dispatch(FetchAvailibleDates(formatDate(activeDate)))
        }
    }, []);

    return (
        <div className={cls.calendarContainer}>
            <div className={cls.calendarHeader}>
                <span>{`${activeDate.toLocaleString("default", {
                    month: "long",
                })} ${activeDate.getFullYear()}`}</span>

                <div className={cls.Arrows}>
                    <span onClick={handlePrevMonth}><LeftIcon/></span>
                    <span onClick={handleNextMonth}><RigthIcon/></span>

                </div>
            </div>
            <div className={cls.calendarGridDays}>
                {daysOfWeek.map((day, index) => <p key={index}>{day}</p>)}
            </div>
            <div className={cls.calendarGrid}>{renderDays()}</div>
        </div>
    );
};