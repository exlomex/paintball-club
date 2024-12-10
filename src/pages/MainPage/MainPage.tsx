import { classNames } from '@/lib/classNames';
import cls from './MainPage.module.scss';
import {MainContent} from "@/components/MainContent";

interface MainPageProps {
    className?: string;
}

export const MainPage = (props: MainPageProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <MainContent/>
        </div>
    )
};
