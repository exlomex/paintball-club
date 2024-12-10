import { classNames } from '@/lib/classNames';
import cls from './MainContent.module.scss';
import {Header} from "@/components/Header";

interface MainContentProps {
    className?: string;
}

export const MainContent = (props: MainContentProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.MainContent, {}, [className])}>
            <Header/>
            <section>
                131
            </section>
        </div>
    )
};
