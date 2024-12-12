import { classNames } from '@/lib/classNames';
import cls from './PlansPage.module.scss';
import {PlansContent} from "@/components/PlansContent";
import {Header} from "@/components/Header";

interface PlansPageProps {
    className?: string;
}

export const PlansPage = (props: PlansPageProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.PlansPage, {}, [className])}>
            <Header/>
            <PlansContent/>
        </div>
    )
};
