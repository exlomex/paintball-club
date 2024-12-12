import { classNames } from '@/lib/classNames';
import cls from './ReservationsPage.module.scss';
import {ReservationsContent} from "@/components/ReservationsContent";
import {Header} from "@/components/Header";

interface ReservationsPageProps {
    className?: string;
}

export const ReservationsPage = (props: ReservationsPageProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.ReservationsPage, {}, [className])}>
            <Header/>
            <ReservationsContent/>
        </div>
    )
};
