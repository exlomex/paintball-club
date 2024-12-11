import {useState, useEffect, ReactElement, FC} from "react";
import cls from "./Calendar.module.scss";

export const Calendar: FC = () => {
    const [activeDate, setActiveDate] = useState<Date>(new Date());

    useEffect(() => {
        setActiveDate(new Date());
    }, []);

    const daysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();

    const startDayOfMonth = new Date(
        activeDate.getFullYear(),
        activeDate.getMonth(),
        1
    ).getDay();

    const handleDayClick = (day: number): void => {
        setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth(), day));
    };

    const handlePrevMonth = (): void => {
        setActiveDate(
            new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = (): void => {
        setActiveDate(
            new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1)
        );
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

    return (
        <div className={cls.calendarContainer}>
            <div className={cls.calendarHeader}>
                <span>{`${activeDate.toLocaleString("default", {
                    month: "long",
                })} ${activeDate.getFullYear()}`}</span>

                <div>
                    <button onClick={handlePrevMonth}>{"<"}</button>
                    <button onClick={handleNextMonth}>{">"}</button>
                </div>
            </div>
            <div className={cls.calendarGrid}>{renderDays()}</div>
        </div>
    );
};